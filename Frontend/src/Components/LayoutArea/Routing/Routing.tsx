import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsList from "../../DataArea/VacationsList/VacationsList";
import InsertVacation from "../../DataArea/InsertVacation/InsertVacation";
import EditVacation from "../../DataArea/EditVacation/EditVacation";

function Routing(): JSX.Element {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/home" element={<Home />} />
      {/* Vacations list */}
      <Route path="/vacations" element={<VacationsList />} />
      {/* Add vacation */}
      <Route path="/vacations/new" element={<InsertVacation />} />
      <Route path="/vacations/edit/:vacationsId" element={<EditVacation />}/>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Page not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
