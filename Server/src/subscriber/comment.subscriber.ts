import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Comment} from "../entity/Comment";
import {ActivityType, Notification} from "../entity/Notification";
import {Post} from "../entity/Post";
import {Repo} from "../lib/repos";
import {NotificationService} from "../service/notification.service";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

    public listenTo() {
        return Comment;
    }

    public async afterInsert(event: InsertEvent<Post>) {
        NotificationService.notify_post_followers(event.entity["user"], ActivityType.COMMENTED_ON, event.entity["post"]);
    }

}
