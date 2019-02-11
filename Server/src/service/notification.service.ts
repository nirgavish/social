import {Comment} from "../entity/Comment";
import {Follow} from "../entity/Follow";
import {Member} from "../entity/Member";
import {ActivityType, Notification} from "../entity/Notification";
import {Repo} from "../lib/repos";
import {User} from "../entity/User";
import {Post} from "../entity/Post";

export class NotificationService {

    public static async notify_followers(of, action, post) {
        const followers = await Repo(Follow).find({where: {following: of}, relations: ["follower"]});

        const messages = [];

        followers.forEach((follower) => {
            const newNotification = {
                recipient: follower.follower,
                activity: ActivityType.PUBLISHED,
                subject: of,
                post,
                seen: false,
            };
            messages.push(newNotification);
        });

        // And one for me
        messages.push({
            recipient: of,
            activity: ActivityType.PUBLISHED,
            subject: of,
            post,
            seen: false,
        });

        Repo(Notification).save(messages);
    }

    public static async notify_group_members(group, user, action, post) {

        const members = await Repo(Member).find({where: {group}, relations: ["user"]});
        const messages = [];

        members.forEach((member) => {
            const newNotification = {
                recipient: member.user,
                activity: ActivityType.PUBLISHED,
                subject: user,
                post,
                groupId: group,
                seen: false,
            };
            messages.push(newNotification);
        });

        Repo(Notification).save(messages);

    }

    public static async notify_post_followers(user, action, post) {
        const postObject = await Repo(Post).findByIds(post, {relations: ["user"]})[0];

        let followers = await Repo(Comment).createQueryBuilder("log_entry").select("DISTINCT(`userId`)").where({post}).execute();
        followers = followers.map((u) => u.userId);

        if (postObject && !followers[postObject["user"]["id"]]) { followers.push(postObject["user"]["id"]); }

        const messages = [];

        followers.forEach((follower) => {
            const newNotification = {
                recipient: follower,
                activity: action,
                subject: user,
                post,
                seen: false,
            };
            messages.push(newNotification);
        });

        Repo(Notification).save(messages);
    }

}
