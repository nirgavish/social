import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Comment} from "../entity/Comment";
import {ActivityType, Notification} from "../entity/Notification";
import {Post} from "../entity/Post";
import {Repo} from "../lib/repos";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

    public listenTo() {
        return Comment;
    }

    public async afterInsert(event: InsertEvent<Post>) {
        return new Promise(async (resolve, reject) => {

            const post = event.entity["post"];

            const partialUpdate = {};
            partialUpdate["subject"] = event.entity["user"];
            partialUpdate["activity"] = ActivityType.COMMENTED_ON;

            Repo(Notification).update({post}, {...partialUpdate});
            resolve();
        });
    }

}
