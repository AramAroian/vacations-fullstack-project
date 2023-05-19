import { NavLink } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import "./VacationsCard.css";

interface VacationsCardProps {
  vacation: VacationsModel;
}

function VacationsCard(props: VacationsCardProps): JSX.Element {
  return (
    <div className="VacationsCard box">
      <div className="card">
        <div className="image-container">
          <img src={props.vacation.imageUrl} alt="Destination Image"></img>
        </div>
        <div className="card-top-right">
          <button className="like-button">Like 0</button>
        </div>
        <div className="card-top-left">
          <NavLink to={"edit/" + props.vacation.vacationsId}>
            <button className="edit-button">Edit</button>
          </ NavLink>
          <button className="delete-button">Delete</button>
        </div>
        <div className="card-body">
          <h2 className="destination-name">{props.vacation.destination}</h2>
          <p className="vacation-dates">
            {props.vacation.startDate} - {props.vacation.endDate}
          </p>
          <div className="vacation-description">
            <p>{props.vacation.description}</p>
          </div>
        </div>
        <div className="card-bottom">
          <button className="purchase-button">Book Vacation</button>
        </div> 
      </div>
    </div>
  );
}

export default VacationsCard;
