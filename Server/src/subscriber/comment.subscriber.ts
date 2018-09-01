import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Comment} from "../entity/Comment";
import {Follow} from "../entity/Follow";
import {Member} from "../entity/Member";
import {ActivityType, Notification} from "../entity/Notification";
import {Post} from "../entity/Post";
import {Repo} from "../lib/repos";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

    public listenTo() {
        return Comment;
    }

    public async afterInsert(event: InsertEvent<Post>) {
        // TODO: Update notifications to push them up the feed
        return new Promise(async (resolve, reject) => {
            Repo(Notification).update({post: event.entity["post"]}, {});
            resolve();
        });
    }

}
