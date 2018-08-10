import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";

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

    @Column()
    public name: string;

    @Column({ nullable: true })
    public description: string;

    @OneToMany((type) => Post, (post) => post.group)
    public posts: Post[];
}
