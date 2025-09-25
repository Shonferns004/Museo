import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiProvider } from './context/ApiContext';
import MonumentList from './components/Booking';
import MonumentDetail from './components/BookingLayout';
import Success from './components/Success';
import BookingHistory from './components/Tickets';
import Home from './pages/Home';
import TourPlanner from './components/TourPlanner';

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

  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/monument/get');
        if (!response.ok) {
          throw new Error('Failed to fetch monuments');
        }
        const data = await response.json();
        setMonuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <Router>
      
      <AuthProvider>
        <ApiProvider>
        <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                  {/* <Route path="/" element={<AnalyticsDashboard />} /> */}

                    <Route path="/" element={<Home/>} />
                    <Route path="/plan" element={<TourPlanner/>} />
                    <Route path="/success" element={<Success/>} />
                    <Route path="/tickets" element={<BookingHistory userId={monuments}/>} />
                    <Route path="/browse" element={<MonumentList monuments={monuments} />} />
                    <Route path="/monument/:id" element={< MonumentDetail monuments={monuments} />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;