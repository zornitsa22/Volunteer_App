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
import Home from "../Pages/Home";
import About from "../Pages/AboutUs";
import Causes from "../Pages/Causes";
import ProfileOrg from "../Pages/ProfileOrg";
import ProfileVol from "../Pages/ProfileVol";
import DashboardOrg from "../Pages/DashboardOrg";
import DashboardVol from "../Pages/DashboardVol";
import ProjectOrg from "../Pages/ProjectOrg";
import ProjectVol from "../Pages/ProjectVol";
import Contact from "../Pages/Contact";

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

        <Route path="/organizations" element={<ProtectedRoute />}>
          <Route path="dashboard/organization" element={<DashboardOrg />} />
          <Route path="profile/organization" element={<ProfileOrg />} />
          <Route path=":id/projects" element={<ProjectOrg />} />
        </Route>

        <Route path="/volunteers" element={<ProtectedRoute />}>
          <Route path="dashboard/volunteer" element={<DashboardVol />} />
          <Route path="profile/volunteer" element={<ProfileVol />} />
          <Route path=":id/projects" element={<ProjectVol />} />
        </Route>

        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<OptionPage />} />
        <Route path="/login/volunteer" element={<LoginVol />} />
        <Route path="/register/volunteer" element={<RegVol />} />
        <Route path="/login/organization" element={<LoginOrg />} />
        <Route path="/register/organization" element={<RegOrg />} />
        
        <Route path="/profile/volunteer" element={<ProfileVol />} />
        
        <Route path="/dashboard/volunteer" element={<DashboardVol />} />
      </Routes>
    </main>
  );
}

export default Main;
