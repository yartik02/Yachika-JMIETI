import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);
    const [allComplaints, setAllComplaints] = useState([]); 
    const [allAdminsComplaints, setAllAdminsComplaints] = useState([]); 

    const storeTokenInLocalStorage = (serverToken) => {
        localStorage.setItem("authToken", serverToken);
        setToken(serverToken);
    }

    const LogoutUser = () => {
        setToken(null);
        setUser(null);
        setAllComplaints([]); 
        localStorage.removeItem("authToken");
    }

    const userAuthentication = useCallback(async () => {
        if (!token) return; // Don't run if no token
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    }, [token]);

    const fetchAllComplaints = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/admin/getAllComplaints`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (response.ok) {
                const data = await response.json();
                setAllComplaints(data);
                // console.log("Complaints data in store:", data);
            } else {
                setAllComplaints([]);
            }
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setAllComplaints([]);
        }
    }, [token]);

    const refetchComplaints = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/getAllComplaints`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (response.ok) {
                const data = await response.json();
                setAllComplaints([...data]);
                // console.log("Complaints data in store:", data);
            } else {
                setAllComplaints([]);
            }
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setAllComplaints([]);
        }
    }, [token]);

    const refetchComplaintsAdmin = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/allComplaintsAdmins`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            if (response.ok) {
                const data = await response.json();
                // FIX: Update the Admin state, not the student state
                setAllAdminsComplaints(data); 
            }
        } catch (error) {
            console.error("Error refetching admin complaints:", error);
        }
    }, [token]);

    const updateComplaintLocally = (updatedComplaint) => {
        setAllComplaints((prevComplaints) => {
            // Find the index of the complaint that was just updated
            const index = prevComplaints.findIndex(c => c._id === updatedComplaint._id);
            
            // If it's not found, just return the old list
            if (index === -1) {
                return prevComplaints;
            }

            // Create a new array (for React state update)
            const newComplaints = [...prevComplaints];
            // Replace the old complaint with the new, updated one
            newComplaints[index] = updatedComplaint;
            
            return newComplaints;
        });
    };

    const getAllComplaintsAdmins = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/admin/allComplaintsAdmins`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (response.ok) {
                const data = await response.json();
                setAllAdminsComplaints(data);
                console.log("Complaints data in store:", data);
            } else {
                setAllAdminsComplaints([]);
            }
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setAllAdminsComplaints([]);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            userAuthentication();
            refetchComplaints(); 
            getAllComplaintsAdmins();
        }
    }, [token, userAuthentication, refetchComplaints, getAllComplaintsAdmins]); 

    return(
        <AuthContext.Provider value={{ 
            storeTokenInLocalStorage, 
            LogoutUser, 
            user, 
            token, 
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