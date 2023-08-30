import { Route, Routes } from "react-router-dom";
import LoginVol from "./LoginVol";
import RegVol from "./RegVol";
import LoginOrg from "./LoginOrg";
import RegOrg from "./RegOrg";
import ProtectedRoute from "./ProtectedRoute";
import Projects from "../Pages/Projects";
import NewProject from "../Pages/NewProject";
import ProjectsDetails from "../Pages/ProjectsDetails";
import UpdateProject from "../Pages/UpdateProject";
import OptionPage from "../Pages/OptionPage";
import ApplyProject from "../Pages/ApplyProject";
import Home from "../Pages/Home"

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/projects" element={<ProtectedRoute />}>
          <Route path="" element={<Projects />} />
          <Route path="new" element={<NewProject />} />
          <Route path=":id" element={<ProjectsDetails />} />
          <Route path=":id/update" element={<UpdateProject />} />
          <Route path=":id/apply" element={<ApplyProject />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/login" element={<OptionPage />} />
        <Route path="/login/volunteer" element={<LoginVol />} />
        <Route path="/register/volunteer" element={<RegVol />} />
        <Route path="/login/organization" element={<LoginOrg />} />
        <Route path="/register/organization" element={<RegOrg />} />
      
        
        

      </Routes>
    </main>
  );
}

export default Main;
