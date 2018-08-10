import {
    BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Group} from "./Group";
import {User} from "./User";

export enum MemberType {
    FOUNDER = 0,
    ADMIN = 1,
    REGULAR = 2,
}

@Entity()
export class Member {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne((type) => User)
    public user: User;

    @ManyToOne((type) => Group)
    public group: Group;

    @Column()
    public memberType: MemberType = MemberType.REGULAR;
}
