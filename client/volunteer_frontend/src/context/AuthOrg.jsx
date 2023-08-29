import { createContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
export const AuthContextOrg = createContext();

const AuthProviderOrg = ({ children }) => {
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const setState = (organization, loading, errors) => {
    setOrganization(organization);
    setLoading(loading);
    setErrors(errors);
};

// Fetch the current organization's data when the component mounts
    useEffect(() => {
        axios
        .get("auth/currentOrganization")
        .then((res) => setState(res.data.organization, false, null))
        .catch((error) => {
        setState(null, false, null);
        });
    }, []);

// Function to handle organization login
const login = async (organization) => {
    setLoading(true);
    try {
        const res = await axios.post("authOrga/login", organization);
        setState(res.data.organization, false, null);
        navigate("/");
    } catch (error) {
        console.log(error.response);
        setState(null, false, error.response.errors);
    }
};

// Function to handle organization registration
const register = async (organization) => {
    setLoading(true);
    try {
        const res = await axios.post("authOrga/register", organization);
        setState(res.data.organization, false, null);
        navigate("/");
    } catch (error) {
        console.log(error.response);
        setState(null, false, error.response.errors);
    }
};

// Function to handle organization logout
const logout = async () => {
    setLoading(true);
    try {
        await axios.post("authOrga/logout", {});
        setState(null, false, null);
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.log(error.response);
        setState(null, false, error.response.errors);
    }
};

 // Provide the context values to child component
return (
    <AuthContextOrg.Provider
    value={{
        organization,
        loading,
        errors,
        login,
        register,
        logout
    }}
    >
        {children}
    </AuthContextOrg.Provider>
);
};

export default AuthProviderOrg;
