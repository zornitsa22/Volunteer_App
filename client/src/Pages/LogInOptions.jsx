import React from "react";
import {Link } from "react-router-dom";

const LogInOptions = () => {


  return <>
  <div>LogInOptions</div>
    <div>
      <Link to="/VolunteerLogInPage">
      <button style={{backgroundColor: "blue"}} >Login as Volunteer</button>
      </Link>
    </div>

    <div>
      <Link to="/OrganizationLogInPage">
      <button style={{backgroundColor: "pink"}}>login as Organization</button>
      </Link>
    </div>   
      
  </>
};

export default LogInOptions;
