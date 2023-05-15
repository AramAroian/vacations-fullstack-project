class VacationsModel {
  public vacationsId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageUrl: string;

  public constructor(vacationsModel: VacationsModel) {
    this.vacationsId = vacationsModel.vacationsId;
    this.destination = vacationsModel.destination;
    this.description = vacationsModel.description;
    this.startDate = vacationsModel.startDate;
    this.endDate = vacationsModel.endDate;
    this.price = vacationsModel.price;
    this.imageUrl = vacationsModel.imageUrl;
  }
}

export default VacationsModel;
