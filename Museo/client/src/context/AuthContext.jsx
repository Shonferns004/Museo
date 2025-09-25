import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "./ApiContext";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {API_URL} = useApi()

  useEffect(() => {
    let isMounted = true;
  
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        const username = localStorage.getItem("username"); // Load username from localStorage
  
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
  
          // If the username is stored separately, merge it into the user object
          if (username) {
            parsedUser.username = username;
          }
  
          if (isMounted) setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
      
      if (isMounted) setIsLoading(false);
    };
  
    initializeAuth();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
      if (response.data.user && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("username", response.data.user.username);
    
        setUser(response.data.user);
      } else {
        throw new Error("Invalid response: missing user or token");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
    
  };

  const register = async (name, email, password) => {
    try {
      // Generate a unique username (consider backend validation)
      const username = `${email.split('@')[0]}_${Math.floor(Math.random() * 10000)}`;
  
      // API call to register the user
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        username,
      });
  
      console.log("Register Response:", response.data); // Debugging
  
      // Check if registration was successful
      return response.data?.message || "Registration successful";
    } catch (error) {
      console.error("Register Error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "An error occurred during registration");
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setUser(null);
  };
  
  
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
