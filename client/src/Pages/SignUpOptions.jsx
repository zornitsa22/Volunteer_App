import React from 'react';
import {Link} from "react-router-dom";

const SignUpOptions = () => {
  return (
    <>
    <label>Not Registered yet ...??</label>

    <div>
      <Link to="/VolunteerSignUpPage">
      <button style={{backgroundColor: "blue"}} >SignUp as Volunteer</button>
      </Link>
    </div>

    <div>
      <Link to="/OrganizationSignUpPage">
      <button style={{backgroundColor: "pink"}}>SignUp as Organization</button>
      </Link>
    </div>   
      
  </>
  )
}

export default SignUpOptions