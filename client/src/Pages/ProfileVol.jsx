
import axios from '../axiosInstance';
import { useState, useEffect } from 'react';


const ProfileVol = () => {
  const [volunteer, setVolunteer] = useState(null);

useEffect(() => {
  axios
    .get(`/api/volunteers/profile`)
    .then(res => setVolunteer(res.data))
    .catch(e => console.log(e.response?.data?.message));
}, []);

return (<>
  <p>MyProfile</p>

  {volunteer && (
    <>
    <div>
    <img
                  src={volunteer.volunteer.image}
                  alt="image"
                  className="h-[200px]"
                />
    <p>Name: {volunteer.volunteer.volunteername}</p>
    <p> Contact: {volunteer.volunteer.contactInfo}</p>
    <p> Skills: {volunteer.volunteer.skills}</p>
    <p>About Me: {volunteer.volunteer.description}</p>
    
   
  </div>
    </>
    
  )

  }
  
  </>);
};

export default ProfileVol;
