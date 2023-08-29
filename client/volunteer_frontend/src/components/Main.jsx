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
import Causes from "../Pages/Causes";
import About from "../Pages/AboutUs";
import HomePage from "../Pages/HomePage"
import LogInOptions from "../Pages/LogInOptions";
import SignUpOptions from "../Pages/SignUpOptions";

function Main() {
  return (
    <main>
      {/* <label>Main section</label> */}
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Projects />} />
          <Route path="project/new" element={<NewProject />} />
          <Route path="projects/:id" element={<ProjectsDetails />} />
          <Route path="projects/:id/update" element={<UpdateProject />} />
        </Route> */}
        {/* <Route path="/login/volunteer" element={<LoginVol />} />
        <Route path="/register/volunteer" element={<RegVol />} />
        <Route path="/login/organization" element={<LoginOrg />} />
        <Route path="/register/organization" element={<RegOrg />} /> */}
        <Route path="/" element={< HomePage/>} />
        <Route path="/causes" element={< Causes/>} />
        <Route path="/about" element={< About/>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/logInOption" element={<LogInOptions />} />
        <Route path="/signUpOption" element={<SignUpOptions />} />
        <Route path="/VolunteerLogInPage" element={<LoginVol />} />
        <Route path="/OrganizationLogInPage" element={<LoginOrg />} />

        <Route path="/OrganizationSignUpPage" element={<RegOrg />} />
        <Route path="/VolunteerSignUpPage" element={<RegVol />} />

        
        

      </Routes>
    </main>
  );
}

export default Main;
