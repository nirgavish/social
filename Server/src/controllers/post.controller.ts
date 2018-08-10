import {Request, Response} from "express";
import {Comment} from "../entity/Comment";
import {Notification} from "../entity/Notification";
import {Post} from "../entity/Post";
import {User, UserRoles} from "../entity/User";
import {Repo} from "../lib/repos";

class PostControllerClass {

    public routes = [
        {path: ":id/comments", method: "get", functionName: "getComments"},
        {path: ":id/comment", method: "post", functionName: "addComment"},
        {path: ":id/comment/:commentId", method: "delete", functionName: "deleteComment"},
    ];

    public async get(req: Request, res: Response) {
        const post = await Repo(Post).findOne(req.params.id, {relations: ["user", "lastComment", "lastComment.user", "group"]});
        if (post) {
            post.user = User.stripBeforeSend(post.user);
            if (post.lastComment) {post.lastComment.user = User.stripBeforeSend(post.lastComment.user); }
            res.json(post);
        } else {
            res.status(404).send();
        }
    }

    public async list(req: Request, res: Response) {
        // TODO: Paging
        const notifications = await Repo(Notification).find({
            order: {dateCreated: "DESC"},
            relations: ["post", "post.user", "post.lastComment", "post.lastComment.user", "post.group"],
            where: {recipient: req.user.id},
        });

        notifications.forEach((notification) => {
            notification.post.user = User.stripBeforeSend(notification.post.user);
            if (notification.post.lastComment) {notification.post.lastComment.user = User.stripBeforeSend(notification.post.lastComment.user); }
        });

        const posts = notifications.map((notification) => notification.post);

        res.json(posts);
    }

    public async post(req: Request, res: Response) {
        // TODO: Post should allow only group IDs the user is a member of
        if (req.user.isLoggedIn) {
            const newPost = req.body;
            newPost.user = req.user.id;
            newPost.dateCreated = new Date();
            newPost.commentCount = 0;

            try {
                await Repo(Post).save(newPost);
                res.json(newPost);
            } catch (e) {
                res.status(422).send(e);
            }
        } else {
            res.status(401).send();
        }
    }

    public async patch(req: Request, res: Response) {
        // owner & admin
        const post = await Repo(Post).findOne({id: req.body.id}, {relations: ["user", "lastComment"]});
        if (req.user.role === UserRoles.ADMIN || post.user.id === req.user.id) {
            try {
                await Repo(Post).update(req.body.id, req.body);
                res.status(200).send();
            } catch (e) {
                res.status(422).send(e);
            }
        } else {
            res.status(403).send();
        }
    }

    public async delete(req: Request, res: Response) {
        // owner & admin
        const post = await Repo(Post).findOne({id: req.params.id}, {relations: ["user"]});
        console.log({a: req.user.role, b: UserRoles.ADMIN, c: post.user.id, d: req.user.id});
        if (req.user.role === UserRoles.ADMIN || post.user.id === req.user.id) {
            try {
                await Repo(Post).delete(req.params.id);
                res.status(200).send();
            } catch (e) {
                res.status(500).send(e);
            }
        } else {
            res.status(403).send();
        }
    }

    public async getComments(req, res) {
        const comments = await Repo(Comment).find({
            where: {post: req.params.id},
            relations: ["user"],
            order: {dateCreated: "ASC"},
        });
        comments.forEach((comment) => {
            comment.user = User.stripBeforeSend(comment.user);
        });
        res.json(comments);
    }

    public async addComment(req, res) {
        // TODO: Everything in this function should be a transaction

        const post = await Repo(Post).findOne(req.params.id);

        // TODO: Allow only users with access to the post
        if (req.user.isLoggedIn) {

            const newComment = Repo(Comment).create({
                body: req.body.body,
                user: req.user.id,
                post: req.params.id,
            });

            try {
                await Repo(Comment).save(newComment);

                post.commentCount = await Repo(Comment).count({post: req.params.id});

                post.lastComment = newComment;
                await Repo(Post).update(req.params.id, post);

                res.json(newComment);
            } catch (e) {
                console.log(e);
                res.status(422).send(e);
            }
        } else {
            res.status(401).send();
        }
    }

    public async deleteComment(req, res) {
        // TODO: Everything in this function should be a transaction
        // TODO: There has to be a better way

        const post = await Repo(Post).findOne({id: req.params.id}, {relations: ["user", "lastComment"]});
        const comment = await Repo(Comment).findOne({id: req.params.commentId}, {relations: ["user"]});

        if (req.user.role === UserRoles.ADMIN || comment.user.id === req.user.id) {
            try {
                post.lastComment = null;
                await Repo(Post).update(req.params.id, post);
                await Repo(Comment).delete(req.params.commentId);

                post.commentCount = await Repo(Comment).count({post: req.params.id});
                if (post.commentCount > 0) {
                    const comments = await Repo(Comment).find({
                        where: {post: post.id},
                        relations: ["user"],
                        order: {dateCreated: "ASC"},
                    });
                    post.lastComment = comments[comments.length - 1];
                }

                await Repo(Post).update(req.params.id, post);

                res.status(200).send();
            } catch (e) {
                res.status(500).send(e);
            }
        } else {
            res.status(403).send();
        }
    }
}

export const PostController = new PostControllerClass();
