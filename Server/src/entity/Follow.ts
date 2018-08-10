import {
    BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class Follow {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne((type) => User)
    public follower: User;

    @ManyToOne((type) => User)
    public following: User;
}
