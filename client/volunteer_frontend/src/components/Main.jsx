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
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="project" element={<Projects />} />
          <Route path="project/new" element={<NewProject />} />
          <Route path="projects/:id" element={<ProjectsDetails />} />
          <Route path="projects/:id/update" element={<UpdateProject />} />
          <Route path="projects/:id/apply" element={<ApplyProject />} />
        </Route>
        <Route path="" element={<Home />} />
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
