import React from "react";
import "./VacationsList.css";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import VacationsCard from "../VacationsCard/VacationsCard";
import vacationsService from "../../../Services/VacationsService";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = React.useState<VacationsModel[]>([]);

  React.useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((dbVacations) => setVacations(dbVacations))
      .catch((err) => notifyService.error(err));
  }, []);

  return (
    <div className="VacationsList">
      {vacations.map((v) => (
        <VacationsCard key={v.vacationsId} vacation={v} />
      ))}
    </div>
  );
}

export default VacationsList;
