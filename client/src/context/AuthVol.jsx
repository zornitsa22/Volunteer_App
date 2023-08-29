import { createContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContextVol = createContext();

const AuthProviderVol = ({ children }) => {

  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const setState = (volunteer, loading, errors) => {
    setVolunteer(volunteer);
    setLoading(loading);
    setErrors(errors);
  };

  // Fetch the current volunteer's data when the component mounts
  useEffect(() => {
    axios
      .get("auth/currentVolunteer")
      .then((res) => setState(res.data.volunteer, false, null))
      .catch((error) => {
        setState(null, false, null);
      });
  }, []);

// Function to handle volunteer login
  const login = async (volunteer) => {
    setLoading(true);
    try {
      const res = await axios.post("auth/login", volunteer);
      setState(res.data.volunteer, false, null);
      navigate("/projects");
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  // Function to handle volunteer registration
  const register = async (volunteer) => {
    setLoading(true);
    try {
      const res = await axios.post("auth/register", volunteer);
      setState(res.data.volunteer, false, null);
      navigate("/login/volunteer");
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  // Function to handle volunteer logout
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("auth/logout", {});
      setState(null, false, null);
      navigate("/Home");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  return (
    <AuthContextVol.Provider
    value={{
      volunteer,
      loading,
      errors,
      login,
      register,
      logout
    }}
    >
      {children}
    </AuthContextVol.Provider>
  );
};

export default AuthProviderVol;
