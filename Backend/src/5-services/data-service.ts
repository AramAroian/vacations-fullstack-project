import VacationsModel from "../2-models/vacations-model";
import UsersModel from "../2-models/users-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";


async function getAllVacations(): Promise<[]> {
    const sql = "SELECT * FROM vacations";
    const vacations = await dal.execute(sql);
    return vacations;
}

async function getFollowedVacations(userId: number): Promise<VacationsModel[]> {
    const sql = "SELECT v.* FROM vacations v INNER JOIN followers f ON v.vacationsId = f.vacationsId WHERE f.usersId = ?";
    const followedVacations = await dal.execute(sql, [userId]);
    return followedVacations;
}

// async function followVacation(userId: number , vacationId: number): Promise<VacationsModel[]> {
//     const sql = "INSERT INTO followers VALUES(?, ?)";
//     const followedVacations = await dal.execute(sql, [userId]);
//     return followedVacations;
// }

async function addAVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const sql = "INSERT INTO vacations VALUES(DEFAULT , ? , ? , ? , ?, ?, ?)";
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageUrl
    ]);
    vacation.vacationsId = result.insertId;
    return vacation;
}

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

async function deleteVacation(vacationsId: number): Promise<void> {
    const sql = "DELETE FROM vacations WHERE vacationsId = ?";
    await dal.execute(sql, [vacationsId]);
}


export default {
    getAllVacations,
    getFollowedVacations,
    addAVacation,
    addUser,
    deleteVacation
};

