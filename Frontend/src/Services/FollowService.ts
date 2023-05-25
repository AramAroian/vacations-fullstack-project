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

  public async followVacation(vacationToFollow: FollowersModel): Promise<void> {
    const response = await axios.post<FollowersModel>(appConfig.followedUrl, vacationToFollow.vacationsId);
    const followedVacation = response.data;
    // Add followed vacation to global state
    followersStore.dispatch({ type: FollowersActionType.FollowVacation, payload: followedVacation });
  }

  public async unfollowVacation(vacationToUnfollow: FollowersModel): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationToUnfollow.vacationsId);
    // Add added vacation to global state
    followersStore.dispatch({ type: FollowersActionType.UnfollowVacation, payload: vacationToUnfollow });
  }
}

const followService = new FollowService();

export default followService;
