import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import VacationsList from "../../DataArea/VacationsList/VacationsList";
import InsertVacation from "../../DataArea/InsertVacation/InsertVacation";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";

function Routing(): JSX.Element {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/home" element={<Home />} />
      {/* Vacations list */}
      <Route path="/vacations" element={<VacationsList />} />
      {/* Add vacation */}
      <Route path="/vacations/new" element={<InsertVacation />} />
      {/* Update vacation */}
      <Route path="/vacations/edit/:vacationsId" element={<EditVacation />} />
      {/* Register */}
      <Route path="/register" element={<Register />} />
      {/* Login */}
      <Route path="/login" element={<Login />} />F
      {/* Default route */}
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Page not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
