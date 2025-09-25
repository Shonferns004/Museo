import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './Components/Layout';
import Login from './pages/Login';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  ApiProvider } from './context/ApiContext';
import AddMonument from './pages/AddMonument';
import MonumentsList from './pages/Monuments';
import Dashboard from './pages/Dashboard';


const PrivateRoute = ({ children }) => {
  
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};



function App() {

  
  return (
      <AuthProvider>
        <ApiProvider>
        <ToastContainer/>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/home" element={<Dashboard/>} />
                    <Route path="/add" element={<AddMonument/>} />
                    <Route path="/view" element={<MonumentsList/>} />
                    
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
        </ApiProvider>
      </AuthProvider>
  );
}

export default App;