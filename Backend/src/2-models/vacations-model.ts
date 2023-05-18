import { UploadedFile } from "express-fileupload";

class VacationsModel {
  public vacationsId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageUrl: string;
  public image: UploadedFile

  public constructor(vacation: VacationsModel) {
    this.vacationsId = vacation.vacationsId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageUrl = vacation.imageUrl;
    this.image = vacation.image;
  }
}

export default VacationsModel;
