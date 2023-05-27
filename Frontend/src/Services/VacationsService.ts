import axios from "axios";
import VacationsModel from "../Models/VacationsModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class VactionsService {
  public async getAllVacations(): Promise<VacationsModel[]> {
    // Get from redux global-state:
    let vacations = vacationsStore.getState().vacations;

    // Get from API: 
    if (vacations.length === 0) {
      const response = await axios.get<VacationsModel[]>(appConfig.vacationsUrl);

      vacations = fitlerByDate(response.data);
      // Update global-store
      vacationsStore.dispatch({ type: VacationsActionType.GetVacations, payload: vacations });
    }
    return vacations;
  }

  public async getVacationById(vacationId: number): Promise<VacationsModel> {
    // Get from redux global-state:
    let vacations = vacationsStore.getState().vacations;
    let vacation = vacations.find(v => v.vacationsId === vacationId);

    // Get from API: 
    if (!vacation) {
      const response = await axios.get<VacationsModel>(appConfig.vacationsUrl + vacationId);
      vacation = response.data;
    }
    return vacation;
  }

  public async addVacation(vacation: VacationsModel): Promise<void> {
    const headers = { "Content-Type": "multipart/form-data" }
    const response = await axios.post<VacationsModel>(appConfig.vacationsUrl, vacation, { headers });
    const addedVacation = response.data;
    // Add added vacation to global state
    vacationsStore.dispatch({type: VacationsActionType.AddVacation,payload: addedVacation});
  }

  public async updateVacation(vacation: VacationsModel): Promise<void> {
    const headers = { "Content-Type": "multipart/form-data" }
    const response = await axios.put<VacationsModel>(appConfig.vacationsUrl + vacation.vacationsId, vacation, { headers });
    const updatedVacation = response.data;
    // Add updated vacation to global state
    vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload: updatedVacation});
  }


  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationId);
    // Add added vacation to global state
    vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload: vacationId});
  }
}

  function fitlerByDate(vacations: VacationsModel[]): VacationsModel[] {
    return vacations.sort((a, b) => convertStringToDate(a.startDate).getTime() - convertStringToDate(b.startDate).getTime())

  }

    function convertStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}/${month}/${day}`);
    return date;
  }

const vacationsService = new VactionsService();

export default vacationsService;
