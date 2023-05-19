import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import UsersModel from "../2-models/users-model";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import cyber from "../4-utils/cyber";
import CredntialsModel from "../2-models/credentials-model";

async function register(user: UsersModel): Promise<string> {
    
    const isTaken = await isEmailTaken(user.email);
    if (isTaken) throw new ValidationError(`The email ${user.email} is already taken`);

    user.authLevel = 'user';

    const sql = `INSERT INTO users VALUES(DEFAULT , ? , ? , ? , ?, '${user.authLevel}')`;
    const result: OkPacket = await dal.execute(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
    ]);
    user.usersId = result.insertId;

    const token = cyber.createToken(user);
    return token;
}

async function isEmailTaken(email: string): Promise<boolean>{
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = '${email}') AS isTaken`;
    const result = await dal.execute(sql);
    const isTaken: number = result[0].isTaken;
    return isTaken === 1;
}

async function login(credentials: CredntialsModel) :Promise<string>{
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    const users = await dal.execute(sql, [
        credentials.email,
        credentials.password
    ]);

    const user = users[0];    
    if (!user) throw new UnauthorizedError('Incorrect username or password');
    const token = cyber.createToken(user);
    return token;
}
export default {
    register,
    login
}