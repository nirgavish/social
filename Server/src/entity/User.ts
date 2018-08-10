import * as md5 from "md5";
import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";

const SALT = "OP_U529o>sN4}8j:_]:)B=EQ(M9m/1L8^iGJ=U9ovZ>2HTF9f+&PbMoqQ<56R?`";

@Entity()
export class User {

    public static hashPassword(cleartext) {
        return md5(SALT + cleartext);
    }

    public static stripBeforeSend(user: User) {
        if (user) {
            delete user.password;
            delete user.email;
            return user;
        }
    }

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @Column()
    public role: UserRoles = UserRoles.MEMBER;

    @OneToMany((type) => Post, (post) => post.user)
    public posts: Post[];

    @BeforeInsert()
    public beforeInsert() {
        this.password = User.hashPassword(this.password);
    }

}

export enum UserRoles {
    ADMIN = 0,
    MEMBER = 1,
}
