
import axios from '../axiosInstance';
import { useState, useEffect } from 'react';

const ProfileVol = () => {
  const [volunteer, setVolunteer] = useState(null);
  console.log("wel come to profile page...@@@");

useEffect(() => {
  axios
    .get(`/api/volunteers/profile`)
    .then(res => setVolunteer(res.data))
    // .then(res => setVolunteer("data data",res.data));
    .catch(e => console.log(e.response?.data?.message));
}, []);

  return (<>
  <p>My profile page volunter</p>

  {volunteer && (
    <>
    <div>
    <label>Volunteer Name:</label><p>{volunteer.volunteer.volunteername}</p>

    <label>Volunteer Contact Information:</label><p>{volunteer.volunteer.contactInfo}</p>

    <label>Volunteer Email:</label><p>{volunteer.volunteer.email}</p>
    
    <label>Volunteer Skills:</label><p>{volunteer.volunteer.skills}</p>
    
    <label>Volunteer Description:</label><p>{volunteer.volunteer.description}</p>
    
    <label>Volunteer Image:</label><p>{volunteer.volunteer.image}</p>
    <img
                  src={volunteer.volunteer.image}
                  alt="image"
                  className="shadow-lg shadow-[#040c16] bg-black-80 group container rounded-md flex justify-center items-center mx-auto content-div"
                />
  </div>
    </>
    
  )

  }
  
  </>);
};

export default ProfileVol;
