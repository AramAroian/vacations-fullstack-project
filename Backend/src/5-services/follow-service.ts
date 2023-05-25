import { ValidationError } from "../2-models/client-errors";
import FollowersModel from "../2-models/followers-model";
import VacationsModel from "../2-models/vacations-model";
import dal from "../4-utils/dal";

async function getFollowedVacationsByUser(userId: number): Promise<VacationsModel[]> {
    const sql = "SELECT v.* FROM vacations v INNER JOIN followers f ON v.vacationsId = f.vacationsId WHERE f.usersId = ?";
    const followedVacations = await dal.execute(sql, [userId]);
    return followedVacations;
}

async function followVacation(followedVacation: FollowersModel): Promise<void> {
    const isFollowed = await isVacationFollowed(followedVacation);
    if (isFollowed) throw new ValidationError(`This user already follows this vacation`);
    
    const sql = "INSERT INTO followers VALUES(?, ?)";
    const followedVacations = await dal.execute(sql, [
        followedVacation.usersId,
        followedVacation.vacationsId
    ]);
}

async function isVacationFollowed(followedVacation: FollowersModel): Promise<boolean>{
    const sql = `SELECT EXISTS(SELECT * FROM followers WHERE usersId = ? and vacationsId = ?) AS isFollowed`;
    const result = await dal.execute(sql, [
        followedVacation.usersId,
        followedVacation.vacationsId
    ]);
    const isTaken: number = result[0].isFollowed;
    return isTaken === 1;
}


async function unfollowVacation(followedVacation: FollowersModel): Promise<void> {
    const sql = "DELETE FROM followers WHERE usersId = ? AND vacationsId = ?";
    const followedVacations = await dal.execute(sql, [
        followedVacation.usersId,
        followedVacation.vacationsId
    ]);
}


export default {
    getFollowedVacationsByUser,
    followVacation,
    unfollowVacation
};

