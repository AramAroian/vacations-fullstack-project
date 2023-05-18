import VacationsModel from "../2-models/vacations-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import appConfig from "../4-utils/app-config";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";


async function getAllVacations(): Promise<[]> {
    const sql = `SELECT destination,
    description,
    DATE_FORMAT(startDate, '%d/%m/%Y') as startDate,
    DATE_FORMAT(endDate, '%d/%m/%Y') as endDate,
    price, 
    CONCAT('${appConfig.imagesUrl}',imageName) AS imageUrl FROM vacations`;
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

    let imageName = null;
    if (vacation.image) {
        imageName = await imageHandler.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `INSERT INTO vacations VALUES(DEFAULT , ? , ? , ? , ?, ?, '${imageName}')`;
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
    ]);
    vacation.vacationsId = result.insertId;

    //preventing unnessecary data to pass to the front
    delete vacation.image;

    return vacation;
}

async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {

    let imageName = await getVacationImageName(vacation.vacationsId);

    if (vacation.image) {
        imageName = await imageHandler.updateImage(vacation.image, imageName);
    }



    vacation.imageUrl = appConfig.imagesUrl + imageName;

    const sql = `UPDATE vacations SET
                    destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = '${imageName}'
                WHERE vacationsId = ${vacation.vacationsId}`;
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
    ]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationsId);

    //preventing unnessecary data to pass to the front
    delete vacation.image;

    return vacation;
}

async function deleteVacation(vacationsId: number): Promise<void> {
    let imageName = await getVacationImageName(vacationsId);
    const sql = "DELETE FROM vacations WHERE vacationsId = ?";
    const result: OkPacket = await dal.execute(sql, [vacationsId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationsId);
    await imageHandler.deleteImage(imageName);
}

async function getVacationImageName(vacationsId: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationsId = '${vacationsId}'`;
    const vacations = await dal.execute(sql);
    if (!vacations) return null;
    const imageName = vacations[0].imageName;
    return imageName
}

export default {
    getAllVacations,
    getFollowedVacations,
    addAVacation,
    updateVacation,
    deleteVacation
};

