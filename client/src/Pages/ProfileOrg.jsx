


import axios from '../axiosInstance';
import { useState, useEffect } from 'react';

const ProfileOrg = () => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/organizations/profile`)
      .then(res => setOrganization(res.data),
      console.log("setOrganization",setOrganization))
      // .then(res => setVolunteer("data data",res.data));
      .catch(e => console.log(e.response?.data?.message));
  }, []);

  return (<>
  <div>Profile Organization</div>
  {organization && (
    <div>

<img
                  src={organization.organization.image}
                  alt="image"
                  className="h-[200px]"
                />
    <label>Organization Name:</label><p>{organization.organization.organizationName}</p>

    <label>Organization Contact Email:</label><p>{organization.organization.email}</p>

    <label>Organization Description:</label><p>{organization.organization.description}</p>

    <label>Organization ContactInformation:</label><p>{organization.organization.contactInfo}</p>
   
  </div>
  )

  }

  </>);

};

export default ProfileOrg;



