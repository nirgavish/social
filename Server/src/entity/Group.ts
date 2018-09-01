import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";
import {User} from "./User";

export enum GroupTypes {
    PUBLIC,
    CLOSED,
    SECRET,
}
// TODO: Implement group types
@Entity()
export class Group {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public dateCreated: Date;

    @Column()
    public name: string;

    @ManyToOne((type) => User, (user) => user.groups)
    public originalFounder: User;

    @Column({ nullable: true })
    public description: string;

    @OneToMany((type) => Post, (post) => post.group)
    public posts: Post[];
}
