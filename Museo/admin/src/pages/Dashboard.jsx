
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Landmark, Ticket, Users, Clock, MapPin, Star, 
  Calendar, CreditCard, Camera, Bell, Settings,
  TrendingUp, Activity, AlertCircle, CheckCircle2
} from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({ 
    total: 0, 
    available: 0,  
    popular: [], 
    recent: [] 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/monument/get-filter");
        if (response.data) {
          setStats({
            total: response.data.total || 0,
            available: response.data.available || 0,
            popular: Array.isArray(response.data.popular) ? response.data.popular.slice(0, 3) : [],
            recent: Array.isArray(response.data.recent) ? response.data.recent.slice(0, 3) : []
          });
        }
      } catch (error) {
        console.error("Error fetching monument data:", error);
        setError("Failed to load monument data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1E1E1E]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB86FC]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1E1E1E] text-red-500">
        {error}
      </div>
    );
  }

  const notifications = [
    { id: 1, type: 'success', message: 'New booking confirmed for Taj Mahal', time: '5 minutes ago' },
    { id: 2, type: 'warning', message: 'Low ticket availability for Qutub Minar', time: '10 minutes ago' },
    { id: 3, type: 'info', message: 'System maintenance scheduled', time: '1 hour ago' },
    { id: 4, type: 'success', message: 'Daily visitor target achieved', time: '2 hours ago' }
  ];

  const quickActions = [
    { icon: <Ticket className="w-5 h-5" />, label: 'Book Tickets' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Schedule Tour' },
    { icon: <Camera className="w-5 h-5" />, label: 'Photo Pass' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  const recentActivities = [
    { icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, action: 'Ticket Booked', monument: 'Taj Mahal', time: '2 min ago' },
    { icon: <Activity className="w-4 h-4 text-blue-400" />, action: 'Tour Started', monument: 'Hawa Mahal', time: '15 min ago' },
    { icon: <AlertCircle className="w-4 h-4 text-yellow-400" />, action: 'Capacity Alert', monument: 'Red Fort', time: '1 hour ago' },
    { icon: <TrendingUp className="w-4 h-4 text-purple-400" />, action: 'Revenue Update', monument: 'All Monuments', time: '2 hours ago' }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#1E1E1E] p-6 space-y-8"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <Landmark className="w-8 h-8 text-[#BB86FC]" />
          <h1 className="text-2xl font-bold text-white">Monument Dashboard</h1>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-[#BB86FC]/10">
            <Bell className="w-6 h-6 text-[#BB86FC]" />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#BB86FC]/20 flex items-center justify-center">
            <span className="text-[#BB86FC] font-medium">AD</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-center space-x-2 p-4 bg-[#2D2D2D] rounded-xl border border-[#BB86FC]/10 hover:border-[#BB86FC]/30 transition-all"
          >
            <span className="text-[#BB86FC]">{action.icon}</span>
            <span className="text-white font-medium">{action.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<Landmark />} title="Total Monuments" value={stats.total} trend="+5%" itemVariants={itemVariants} />
<StatCard icon={<Ticket />} title="Available Tickets" value={stats.available} trend="-2%" itemVariants={itemVariants} />
<StatCard icon={<Users />} title="Daily Visitors" value="2,451" trend="+12%" itemVariants={itemVariants} />
<StatCard icon={<CreditCard />} title="Revenue" value="₹1.2M" trend="+8%" itemVariants={itemVariants} />

      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Monuments */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-[#2D2D2D] rounded-xl p-6 border border-[#BB86FC]/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Popular Monuments</h2>
            <button className="text-[#BB86FC] hover:text-[#BB86FC]/80">View All</button>
          </div>
          <div className="space-y-4">
            {stats.popular.map((monument) => (
              <div key={monument._id} className="flex items-center bg-[#1E1E1E] p-4 rounded-lg">
                <img 
                  src={monument.imageUrl || '/placeholder-monument.jpg'}
                  alt={monument.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-white font-medium">{monument.name}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {monument.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#BB86FC] font-bold">₹{monument.amount}</div>
                  <div className="text-gray-400 text-sm">{monument.ticketsSold} tickets</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="bg-[#2D2D2D] rounded-xl p-6 border border-[#BB86FC]/10">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-[#1E1E1E] rounded-lg">
                <div className="mt-1">{activity.icon}</div>
                <div>
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-gray-400 text-sm">{activity.monument}</div>
                  <div className="text-gray-500 text-xs">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Notifications */}
      <motion.div variants={itemVariants} className="bg-[#2D2D2D] rounded-xl p-6 border border-[#BB86FC]/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <button className="text-[#BB86FC] hover:text-[#BB86FC]/80">Mark all as read</button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4 bg-[#1E1E1E] p-4 rounded-lg">
              <div className={`
                w-2 h-2 mt-2 rounded-full
                ${notification.type === 'success' ? 'bg-green-400' : ''}
                ${notification.type === 'warning' ? 'bg-yellow-400' : ''}
                ${notification.type === 'info' ? 'bg-blue-400' : ''}
              `} />
              <div className="flex-1">
                <p className="text-white">{notification.message}</p>
                <p className="text-gray-500 text-sm">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, trend, itemVariants }) => {
    const isPositive = trend.startsWith('+');
  
    return (
      <motion.div
        variants={itemVariants} // ✅ Fix: itemVariants now comes as a prop
        className="bg-[#2D2D2D] p-6 rounded-xl border border-[#BB86FC]/10"
      >
        <div className="flex items-center justify-between">
          <div className="p-3 bg-[#BB86FC]/10 rounded-lg">
            <div className="text-[#BB86FC]">{icon}</div>
          </div>
          <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        </div>
        <h3 className="text-gray-400 mt-4">{title}</h3>
        <div className="text-2xl font-bold text-white mt-1">{value}</div>
      </motion.div>
    );
  };
  

export default Home;