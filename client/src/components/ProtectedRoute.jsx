import  { useContext } from "react";
import { AuthContextVol } from "../context/AuthVol";
import { AuthContextOrg } from "../context/AuthOrg";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  //accessing context values from AuthContextVol and AuthContextOrg
  const { volunteer, loading: volLoading } = useContext(AuthContextVol);  
  const { organization, loading: orgLoading } = useContext(AuthContextOrg);

  // Determine if a user is logged in by checking either volunteer or organization
   const isLoggedIn = volunteer || organization;

  // // Combining loading states from both contexts
   const isLoading = volLoading || orgLoading;

  return (
    <>

      {!isLoading && (
        <>
          {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;



