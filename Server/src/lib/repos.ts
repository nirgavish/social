import {getManager, Repository} from "typeorm";
import {User} from "../entity/User";

export function Repo(type): Repository<any> {
    return getManager().getRepository(type);
}
