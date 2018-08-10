import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Post} from "./Post";
import {User} from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    public body: string;

    @Column()
    public dateCreated: Date = new Date();

    @ManyToOne((type) => User) // , (user) => user.posts
    public user: User;

    @ManyToOne((type) => Post, {onDelete: "CASCADE"})
    public post: Post;

}
