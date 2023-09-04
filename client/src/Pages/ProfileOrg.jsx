


import axios from '../axiosInstance';
import { useState, useEffect } from 'react';

const ProfileOrg = () => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/organizations/profile`)
      .then(res => setOrganization(res.data),
      console.log("setOrganization",setOrganization))
      .catch(e => console.log(e.response?.data?.message));
  }, []);

  return (<>
  <p>MyProfile</p>
  {organization && (
    <div>

<img
                  src={organization.organization.image}
                  alt="image"
                  className="h-[200px]"
                />
    <p>Name: {organization.organization.organizationName}</p>

    <p>Email: {organization.organization.email}</p>

    <p>Description: {organization.organization.description}</p>

    <p>ContactPerson: {organization.organization.contactInfo}</p>
   
  </div>
  )

  }

  </>);

};

export default ProfileOrg;



