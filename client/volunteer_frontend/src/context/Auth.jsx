import { createContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const setState = (volunteer, loading, errors) => {
    setVolunteer(volunteer);
    setLoading(loading);
    setErrors(errors);
  };
  useEffect(() => {
    axios
      .get("auth/currentVolunteer")
      .then((res) => setState(res.data.volunteer, false, null))
      .catch((error) => {
        setState(null, false, null);
      });
  }, []);

  const login = async (volunteer) => {
    setLoading(true);
    try {
      const res = await axios.post("auth/login", volunteer);
      setState(res.data.volunteer, false, null);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  const register = async (volunteer) => {
    setLoading(true);
    try {
      const res = await axios.post("auth/register", volunteer);
      setState(res.data.volunteer, false, null);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("auth/logout", {});
      setState(null, false, null);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
      setState(null, false, error.response.errors);
    }
  };
  return (
    <AuthContext.Provider
      value={(volunteer, loading, errors, login, register, logout)}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
