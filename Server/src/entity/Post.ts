import {
    BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Group} from "./Group";
import {Comment} from "./Comment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    public body: string;

    @Column()
    public dateCreated: Date = new Date();

    @Column()
    public commentCount: number;

    @OneToOne((type) => Comment)
    @JoinColumn()
    public lastComment: Comment;

    @ManyToOne((type) => User, (user) => user.posts)
    public user: User;

    @ManyToOne((type) => Group, (group) => group.posts)
    public group?: Group;

}
