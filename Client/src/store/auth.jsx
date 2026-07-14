import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [allComplaints, setAllComplaints] = useState([]);
    const [allAdminsComplaints, setAllAdminsComplaints] = useState([]);
    const [isAuthChecked, setIsAuthChecked] = useState(false); // tracks whether initial auth check is done

    const isLoggedIn = !!user;
    const LogoutUser = useCallback(async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include", // Send the cookie so server can verify & clear it
                }
            );
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            setUser(null);
            setAllComplaints([]);
            setAllAdminsComplaints([]);
            navigate("/login");
        }
    }, []);

    const userAuthentication = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`,
                {
                    method: "GET",
                    credentials: "include", // Browser automatically sends the HttpOnly cookie
                },
            );
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            } else {
                setUser(null); // Cookie invalid or expired — treat as logged out
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
            setUser(null);
        } finally {
            setIsAuthChecked(true);
        }
    }, []);

    const refetchComplaints = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/getAllComplaints`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (response.ok) {
                const data = await response.json();
                setAllComplaints([...data]);
            } else {
                setAllComplaints([]);
            }
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setAllComplaints([]);
        }
    }, []);

    const refetchComplaintsAdmin = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/allComplaintsAdmins`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (response.ok) {
                const data = await response.json();
                setAllAdminsComplaints(data);
            }
        } catch (error) {
            console.error("Error refetching admin complaints:", error);
        }
    }, []);

    const updateComplaintLocally = (updatedComplaint) => {
        setAllComplaints((prevComplaints) => {
            const index = prevComplaints.findIndex(c => c._id === updatedComplaint._id);
            if (index === -1) {
                return prevComplaints;
            }
            const newComplaints = [...prevComplaints];
            newComplaints[index] = updatedComplaint;
            return newComplaints;
        });
    };

    const getAllComplaintsAdmins = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/allComplaintsAdmins`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (response.ok) {
                const data = await response.json();
                setAllAdminsComplaints(data);
            } else {
                setAllAdminsComplaints([]);
            }
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setAllAdminsComplaints([]);
        }
    }, []);

    // On mount: verify session via cookie (replaces localStorage.getItem("authToken") on load)
    useEffect(() => {
        userAuthentication();
    }, [userAuthentication]);

    // Once user is set, fetch their data
    useEffect(() => {
        if (user) {
            refetchComplaints();
            getAllComplaintsAdmins();
        }
    }, [user, refetchComplaints, getAllComplaintsAdmins]);

    return (
        <AuthContext.Provider value={{
            LogoutUser,
            user,
            isLoggedIn,
            isAuthChecked,
            userAuthentication,
            allComplaints,
            refetchComplaints,
            refetchComplaintsAdmin,
            getAllComplaintsAdmins,
            updateComplaintLocally,
            allAdminsComplaints,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if (!AuthContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return AuthContextValue;
}