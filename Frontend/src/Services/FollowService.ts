import axios from "axios";
import appConfig from "../Utils/AppConfig";
import FollowersModel from "../Models/FollowersModel";
import { FollowersActionType, followersStore } from "../Redux/FollowState";

class FollowService {
  public async getAllFollowedVacations(): Promise<FollowersModel[]> {
    // Get from redux global-state:
    let followers = followersStore.getState().followers;

    // Get from API: 
    if (followers.length === 0) {
      const response = await axios.get<FollowersModel[]>(appConfig.followedUrl);
      followers = response.data;
      // Update global-store
      followersStore.dispatch({ type: FollowersActionType.GetAllFollowers, payload: followers });
    }
    return followers;
  }

  public async getFollowedVacationsByUser(userId: number): Promise<FollowersModel[]> {
    // Get from redux global-state:
    let followers = followersStore.getState().followers;
    let followedByUser = followers.filter(f => f.usersId === userId);

    // Get from API: 
    if (!followedByUser) {
      const response = await axios.get<FollowersModel[]>(appConfig.followedUrl + userId);
      followedByUser = response.data;
    }
    return followedByUser;
  }

  public async followVacation(toFollowId: number): Promise<void> {
    const response = await axios.post<FollowersModel>(appConfig.followedUrl + toFollowId);
    const followedVacation = response.data;
    // Add followed vacation to global state
    followersStore.dispatch({ type: FollowersActionType.FollowVacation, payload: followedVacation });
    
  }

  public async unfollowVacation(toUnfollowVacation: FollowersModel): Promise<void> {
    await axios.delete(appConfig.followedUrl + toUnfollowVacation.vacationsId);
    // Add added vacation to global state
    followersStore.dispatch({ type: FollowersActionType.UnfollowVacation, payload: toUnfollowVacation });
  }
}

const followService = new FollowService();

export default followService;
