import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
// import {Follow} from "../entity/Follow";
// import {Member} from "../entity/Member";
import {ActivityType} from "../entity/Notification"; // , Notification
import {Post} from "../entity/Post";
// import {Repo} from "../lib/repos";
import {NotificationService} from "../service/notification.service";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

    public listenTo() {
        return Post;
    }

    public async afterInsert(event: InsertEvent<Post>) {
        return new Promise(async (resolve, reject) => {
            const post = event.entity;
            if (post.group) {
                // Publish to group members
                NotificationService.notify_group_members(post.group, post.user, ActivityType.PUBLISHED, post);
                /*
                const members = await Repo(Member).find({where: {group: post.group}, relations: ["user"]});
                const messages = [];

                members.forEach((member) => {
                    const newNotification = {
                        recipient: member.user,
                        activity: ActivityType.PUBLISHED,
                        subject: post.user,
                        post,
                        groupId: post.group,
                        seen: false,
                    };
                    messages.push(newNotification);
                });

                Repo(Notification).save(messages);
                */
            } else {
                // Publish to user followers
                NotificationService.notify_followers(post.user, ActivityType.PUBLISHED, post);
                /*
                const followers = await Repo(Follow).find({where: {following: post.user}, relations: ["follower"]});
                const messages = [];

                followers.forEach((follower) => {
                    const newNotification = {
                        recipient: follower.follower,
                        activity: ActivityType.PUBLISHED,
                        subject: post.user,
                        post,
                        seen: false,
                    };
                    messages.push(newNotification);
                });

                // And one for me
                messages.push({
                    recipient: post.user,
                    activity: ActivityType.PUBLISHED,
                    subject: post.user,
                    post,
                    seen: false,
                });

                Repo(Notification).save(messages);
                */
            }

            resolve(event);
        });
    }

}
