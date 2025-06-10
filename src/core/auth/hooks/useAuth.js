import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const {
        user,
        loading,
        isAuthenticated
    } = useContext(AuthContext);

    return {
        user,
        loading,
        isAuthenticated
    };
}