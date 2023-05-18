import axios from "axios";
import VacationsModel from "../Models/VacationsModel";
import appConfig from "../Utils/AppConfig";

class VactionsService {
    public async getAllVacations(): Promise<VacationsModel[]> {
        const response = await axios.get<VacationsModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;
        return vacations;
      }
    
      public async getFollowedVacations(genreId: number): Promise<VacationsModel[]> {
        const response = await axios.get<VacationsModel[]>(
          appConfig.followedUrl + genreId
        );
        const vacations = response.data;
        return vacations;
      }
    
      public async addVacation(vacation: VacationsModel): Promise<VacationsModel> {
        const headers = { "Content-Type": "multipart/form-data" }
        const response = await axios.post<VacationsModel>(appConfig.vacationsUrl, vacation, { headers });
        const addedVacation = response.data;
        return addedVacation;
      }
    
      public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationId);
      }
}

const vacationsService = new VactionsService();

export default vacationsService;
