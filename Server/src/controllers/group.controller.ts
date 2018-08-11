import {Request, Response} from "express";
import {Group} from "../entity/Group";
import {Member, MemberType} from "../entity/Member";
import {Post} from "../entity/Post";
import {User} from "../entity/User";
import {Repo} from "../lib/repos";

class GroupControllerClass {

    public routes = [
        {path: ":id/members", method: "get", functionName: "getMembers"},
        {path: ":id/feed", method: "get", functionName: "getFeed"},
        {path: ":id/membership", method: "post", functionName: "joinLeave"},
        {path: ":id/membership", method: "delete", functionName: "joinLeave"},
    ];

    public async joinLeave(req: Request, res: Response) {
        // TODO: On leave, remove notifications from user's activity stream
        // TODO: More complex flows to joining (admin confirmations, invites, etc.)
        if (req.user.isLoggedIn) {
            const memberConnection = {user: req.user.id, group: req.params.id };
            const connection = await Repo(Member).findOne(memberConnection);
            try {
                if (!connection && req.method === "POST") {
                    memberConnection["memberType"] = MemberType.REGULAR;
                    await Repo(Member).save(memberConnection);
                }
                if (connection && req.method === "DELETE") { await Repo(Member).delete(memberConnection); }
                res.status(200).send();
            } catch (e) {
                res.status(500).send(e);
            }
        } else {
            res.status(401).send();
        }
    }

    public async getFeed(req: Request, res: Response) {
        // TODO: Show feed only of groups the user can see (as member or open groups)
        const posts = await Repo(Post).find({where: {group: req.params.id}, order: {dateCreated: "DESC"}, relations: ["user"]});
        posts.forEach((post) => {
            post.user = User.stripBeforeSend(post.user);
        });
        res.json(posts);
    }

    public async getMembers(req: Request, res: Response) {
        const members = await Repo(Member).find({where: {group: req.params.id}, relations: ["user"]});
        members.forEach((m) => {
            m.user = User.stripBeforeSend(m.user);
        });
        res.json(members);
    }

    public async get(req: Request, res: Response) {
        // TODO: Show only groups the user can see (as member or open groups)
        const group = await Repo(Group).findOne(req.params.id);
        if (group) {
            const userId = req.user.id;
            const groupId = req.params.id;
            const connection = await Repo(Member).findOne({user: userId, group: groupId});
            group.isMember = !!connection;
            res.json(group);
        } else {
            res.status(404).send();
        }
    }

    public async list(req: Request, res: Response) {
        // TODO: List only groups the user can see (as member or open groups)
        const posts = await Repo(Group).find();
        res.json(posts);
    }

    public async post(req: Request, res: Response) {
        // TODO: Implement secret, closed and public
        if (req.user.isLoggedIn) {
            const newGroup = req.body;
            newGroup.dateCreated = new Date();
            try {
                await Repo(Group).save(newGroup);

                const founderConnection = {user: req.user.id, group: newGroup.id };
                founderConnection["memberType"] = MemberType.FOUNDER;
                await Repo(Member).save(founderConnection);

                res.json(newGroup);
            } catch (e) {
                res.status(422).send(e);
            }
        } else {
            res.status(401).send();
        }
    }

    public patch(req: Request, res: Response) {
        // TODO: Implement patch group
        res.status(501).send();
    }

    public delete(req: Request, res: Response) {
        // TODO: Who can delete? What happens to messages?
        res.status(501).send();
    }

}

export const GroupController = new GroupControllerClass();
