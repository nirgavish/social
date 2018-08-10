import {BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";
import {User} from "./User";

export enum ActivityType {
    PUBLISHED = 0,
    COMMENTED_ON = 1,
    LIKED = 2,
}

@Entity()
export class Notification {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    // TODO: convert to @CreateDateColumn() (look into 'special columns': http://typeorm.io/#/entities/entity-columns
    @CreateDateColumn()
    public dateCreated: Date;

    @ManyToOne((type) => User, {onDelete: "CASCADE"}) // , (user) => user.posts
    public recipient: User;

    @ManyToOne((type) => User, {onDelete: "CASCADE"}) // , (user) => user.posts
    public subject: User;

    @Column()
    public activity: ActivityType = ActivityType.PUBLISHED;

    @ManyToOne((type) => Post, {onDelete: "CASCADE"})
    public post: Post;

    @Column()
    public seen: boolean;

}
