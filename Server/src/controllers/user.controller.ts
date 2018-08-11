import {Request, Response} from "express";
import {Config} from "../../../app.config";
import {Follow} from "../entity/Follow";
import {Post} from "../entity/Post";
import {User, UserRoles} from "../entity/User";
import {Repo} from "../lib/repos";

// TODO: Change Password functionality

class UserControllerClass {

    public routes = [
        {path: ":id/feed", method: "get", functionName: "feed"},
        {path: ":id/follow", method: "post", functionName: "followUnfollow"},
        {path: ":id/follow", method: "delete", functionName: "followUnfollow"},
    ];

    public async followUnfollow(req: Request, res: Response) {
        if (req.user.isLoggedIn) {
            const followConnection = {follower: req.user.id, following: req.params.id };
            const connection = await Repo(Follow).findOne(followConnection);
            try {
                if (!connection && req.method === "POST") { await Repo(Follow).save(followConnection); }
                if (connection && req.method === "DELETE") { await Repo(Follow).delete(followConnection); }
                res.status(200).send();
            } catch (e) {
                res.status(500).send(e);
            }
        } else {
            res.status(401).send();
        }
    }

    public async feed(req: Request, res: Response) {
        if (Config.walledGarden && !req.user.isLoggedIn) {
            res.status(401).send();
            return;
        }

        const posts = await Repo(Post).find({
            order: {dateCreated: "DESC"},
            relations: ["user", "lastComment", "lastComment.user", "group"],
            where: {user: req.params.id, group: null},
        });

        posts.forEach((post) => {
            post.user = User.stripBeforeSend(post.user);
            if (post.lastComment) {post.lastComment.user = User.stripBeforeSend(post.lastComment.user); }
        });
        res.json(posts);
    }

    public async get(req: Request, res: Response) {
        if (Config.walledGarden && !req.user.isLoggedIn) {
            res.status(401).send();
            return;
        }
        const user = await Repo(User).findOne(req.params.id);
        if (user) {
            user.followerCount = await Repo(Follow).count({where: {following: user.id}});
            user.followingCount = await Repo(Follow).count({where: {follower: user.id}});
            if (req.user.isLoggedIn) {
                const follower = req.user.id;
                const following = req.params.id;

                const connection = await Repo(Follow).findOne({follower, following });
                user.following = !!connection;
            }
            res.json(User.stripBeforeSend(user));
        } else {
            res.status(404).send();
        }
    }

    public async list(req: Request, res: Response) {
        if (req.user.role === UserRoles.ADMIN) {
            res.json(await Repo(User).find());
        } else {
            res.status(403).send();
        }
    }

    public async post(req: Request, res: Response) {
        if (Config.walledGarden && !req.user.isLoggedIn) {
            res.status(401).send();
            return;
        }
        if (!(req.user.role === UserRoles.ADMIN)) { req.body.role = UserRoles.MEMBER; } // Only Admins can create other Admins
        try {
            const newUser = await Repo(User).create(req.body);
            await Repo(User).save(newUser);
            res.status(200).send();
        } catch (e) {
            res.status(422).send(e);
        }
    }

    public async patch(req: Request, res: Response) {
        if (req.user.role === UserRoles.ADMIN || req.user.id === req.params.id) {
            if (req.user.role !== UserRoles.ADMIN) { req.body.role = UserRoles.MEMBER; } // Only Admins can change others to Admin
            try {
                await Repo(User).update(req.body.id, req.body);
                res.status(200).send();
            } catch (e) {
                res.status(422).send(e);
            }
        } else {
            res.status(403).send();
        }
    }

    public async delete(req: Request, res: Response) {
        if (req.user.role === UserRoles.ADMIN || req.user.id === req.params.id) {
            await Repo(User).delete(req.params.id);
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    }

}

export const UserController = new UserControllerClass();
