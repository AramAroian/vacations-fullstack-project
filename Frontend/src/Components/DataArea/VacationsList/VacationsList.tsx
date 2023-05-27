import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import VacationsCard from "../VacationsCard/VacationsCard";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationsState";
import UsersModel from "../../../Models/UsersModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import FollowersModel from "../../../Models/FollowersModel";
import followService from "../../../Services/FollowService";
import { followersStore } from "../../../Redux/FollowState";

function VacationsList(): JSX.Element {

  const [user, setUser] = useState<UsersModel>();
  const [vacations, setVacations] = useState<VacationsModel[]>([]);
  const [followedVacations, setFollowedVacations] = useState<FollowersModel[]>([]);
  const [followedByUser, setFollowedByUser] = useState<FollowersModel[]>([]);

  // Init checkbox filter options
  const [filters, setFilters] = useState({
    followed: false,
    ongoing: false,
    future: false
  });


  // Getting user from state
  useEffect(() => {
    setUser(authStore.getState().user);
  }, []);

  // Getting vacations and followers
  useEffect(() => {
    if (user) {
      vacationsService
        .getAllVacations()
        .then((dbVacations) => setVacations(dbVacations))
        .catch((err) => notifyService.error(err));

      followService
        .getAllFollowedVacations()
        .then((dbFollowedVacations) => setFollowedVacations(dbFollowedVacations))
        .catch((err) => notifyService.error(err))

      const unsubscrubeVacations = vacationsStore.subscribe(() => {
        setVacations(vacationsStore.getState().vacations);
      });
      const unsubscrubeFollowed = followersStore.subscribe(() => {
        setFollowedVacations(followersStore.getState().followers);
      });
      return () => {
        unsubscrubeVacations();
        unsubscrubeFollowed();
      }
    }
  }, [user]);

  // Filtering vacations that are followed by the current user
  useEffect(() => {
    const followedByCurrentUser = followedVacations.filter((follower) => follower.usersId === user.usersId);
    setFollowedByUser(followedByCurrentUser);
  }, [followedVacations]);

  // Checkbox filters and date filter functions
  function isFollowedByUser(vacationId: number): boolean {
    return followedByUser.some((f) => f.vacationsId === vacationId)
  }

  function convertStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}/${month}/${day}`);
    return date;
  }

  function isVacationOngoing(vacation: VacationsModel): boolean {
    const today = new Date();
    return (convertStringToDate(vacation.startDate) < today && convertStringToDate(vacation.endDate) > today);
  }

  function isFutureVacation(vacation: VacationsModel): boolean {
    const today = new Date();
    return (convertStringToDate(vacation.startDate) > today);
  }

  function fitlerByDate(vacations: VacationsModel[]): VacationsModel[] {
    return vacations.sort((a, b) => convertStringToDate(a.startDate).getTime() - convertStringToDate(b.startDate).getTime())

  }

  // Event handlers
  const handleDeleteVacation = (vacationsId: number) => {
    setVacations((prevVacations) => prevVacations.filter((v) => v.vacationsId !== vacationsId));
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const handleToggleLike = (vacationId: number) => {
    const isFollowed = isFollowedByUser(vacationId);
    if (isFollowed) {
      followService
        .unfollowVacation(vacationId)
        .then(() => {
          setFollowedVacations((prevFollowedVacations) =>
            prevFollowedVacations.filter((f) => f.vacationsId !== vacationId)
          );
          notifyService.success("Vacation unfollowed");
        })
        .catch((err) => notifyService.error(err));
    } else {
      followService
        .followVacation(vacationId)
        .then(() => {
          setFollowedVacations((prevFollowedVacations) => [
            ...prevFollowedVacations,
            { vacationsId: vacationId, usersId: user?.usersId },
          ]);
          notifyService.success("Vacation followed");
        })
        .catch((err) => notifyService.error(err));
    }
  };

  return (
    <div className="VacationsList">
      {user?.authLevel === 'admin' &&
        <div className="add-button-div">
          <NavLink to="/vacations/new">
            <button className="add-button">+ New Vacation</button>
          </ NavLink>
        </div>
      }
      {user?.authLevel === 'user' &&
        <div>
          <label>
            <input
              type="checkbox"
              name="followed"
              checked={filters.followed}
              onChange={handleCheckboxChange}
            />
            Followed vacations
          </label>

          <label>
            <input
              type="checkbox"
              name="ongoing"
              checked={filters.ongoing}
              onChange={handleCheckboxChange}
            />
            Ongoing vacations
          </label>

          <label>
            <input
              type="checkbox"
              name="future"
              checked={filters.future}
              onChange={handleCheckboxChange}
            />
            Future vacations
          </label>
        </div>
      }
      {fitlerByDate(vacations)
        .filter((v) => {
          return (
            (!filters.followed || isFollowedByUser(v.vacationsId)) &&
            (!filters.ongoing || isVacationOngoing(v)) &&
            (!filters.future || isFutureVacation(v))
          );
        })
        .map((v) => (
          <VacationsCard
            key={v.vacationsId}
            vacation={v}
            onDeleteVacation={handleDeleteVacation}
            onToggleLike={handleToggleLike}
            isFollowedByUser={isFollowedByUser(v.vacationsId)} />
        ))}
    </div>
  );
}

export default VacationsList;

