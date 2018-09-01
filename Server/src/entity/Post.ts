import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Comment} from "./Comment";
import {Group} from "./Group";
import {User} from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("text")
    public body: string;

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateModified: Date;

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
