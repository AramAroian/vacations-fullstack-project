import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import UsersModel from "../2-models/users-model";

async function addUser(user: UsersModel): Promise<UsersModel> {
    const sql = "INSERT INTO users VALUES(DEFAULT , ? , ? , ? , ?, ?)";
    const result: OkPacket = await dal.execute(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.authLevel
    ]);
    user.usersId = result.insertId;
    return user;
}

export default {
    addUser
}