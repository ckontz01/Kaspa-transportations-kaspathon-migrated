import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterPassenger from './pages/RegisterPassenger'
import RegisterDriver from './pages/RegisterDriver'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Passenger pages
import PassengerDashboard from './pages/passenger/Dashboard'
import RequestRide from './pages/passenger/RequestRide'
import RequestAutonomousRide from './pages/passenger/RequestAutonomousRide'
import RidesHistory from './pages/passenger/RidesHistory'
import PassengerPayments from './pages/passenger/Payments'
import PassengerMessages from './pages/passenger/Messages'
import PassengerSettings from './pages/passenger/Settings'
import GdprRequest from './pages/passenger/GdprRequest'
import RequestStatus from './pages/passenger/RequestStatus'

// Driver pages
import DriverDashboard from './pages/driver/Dashboard'
import DriverTrips from './pages/driver/Trips'
import DriverVehicles from './pages/driver/Vehicles'
import DriverEarnings from './pages/driver/Earnings'
import DriverMessages from './pages/driver/Messages'
import DriverSettings from './pages/driver/Settings'

// Operator pages
import OperatorDashboard from './pages/operator/Dashboard'
import DriversHub from './pages/operator/DriversHub'
import AutonomousHub from './pages/operator/AutonomousHub'
import CarShareHub from './pages/operator/CarShareHub'
import OperationsHub from './pages/operator/OperationsHub'

// CarShare pages
import CarShareRegister from './pages/carshare/Register'
import CarShareRequestVehicle from './pages/carshare/RequestVehicle'

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-gray-400">Loading...</div></div>
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) {
    if (user.role === 'passenger') return <Navigate to="/passenger/dashboard" replace />
    if (user.role === 'driver') return <Navigate to="/driver/dashboard" replace />
    if (user.role === 'operator') return <Navigate to="/operator/dashboard" replace />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<PublicOnlyRoute><Home /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register/passenger" element={<PublicOnlyRoute><RegisterPassenger /></PublicOnlyRoute>} />
        <Route path="/register/driver" element={<PublicOnlyRoute><RegisterDriver /></PublicOnlyRoute>} />

        {/* Profile - any logged in user */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Passenger routes */}
        <Route path="/passenger/dashboard" element={<ProtectedRoute role="passenger"><PassengerDashboard /></ProtectedRoute>} />
        <Route path="/passenger/request-ride" element={<ProtectedRoute role="passenger"><RequestRide /></ProtectedRoute>} />
        <Route path="/passenger/request-autonomous" element={<ProtectedRoute role="passenger"><RequestAutonomousRide /></ProtectedRoute>} />
        <Route path="/passenger/rides-history" element={<ProtectedRoute role="passenger"><RidesHistory /></ProtectedRoute>} />
        <Route path="/passenger/payments" element={<ProtectedRoute role="passenger"><PassengerPayments /></ProtectedRoute>} />
        <Route path="/passenger/messages" element={<ProtectedRoute role="passenger"><PassengerMessages /></ProtectedRoute>} />
        <Route path="/passenger/settings" element={<ProtectedRoute role="passenger"><PassengerSettings /></ProtectedRoute>} />
        <Route path="/passenger/gdpr" element={<ProtectedRoute role="passenger"><GdprRequest /></ProtectedRoute>} />
        <Route path="/passenger/request-status" element={<ProtectedRoute role="passenger"><RequestStatus /></ProtectedRoute>} />

        {/* Driver routes */}
        <Route path="/driver/dashboard" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
        <Route path="/driver/trips" element={<ProtectedRoute role="driver"><DriverTrips /></ProtectedRoute>} />
        <Route path="/driver/vehicles" element={<ProtectedRoute role="driver"><DriverVehicles /></ProtectedRoute>} />
        <Route path="/driver/earnings" element={<ProtectedRoute role="driver"><DriverEarnings /></ProtectedRoute>} />
        <Route path="/driver/messages" element={<ProtectedRoute role="driver"><DriverMessages /></ProtectedRoute>} />
        <Route path="/driver/settings" element={<ProtectedRoute role="driver"><DriverSettings /></ProtectedRoute>} />

        {/* Operator routes */}
        <Route path="/operator/dashboard" element={<ProtectedRoute role="operator"><OperatorDashboard /></ProtectedRoute>} />
        <Route path="/operator/drivers-hub" element={<ProtectedRoute role="operator"><DriversHub /></ProtectedRoute>} />
        <Route path="/operator/autonomous-hub" element={<ProtectedRoute role="operator"><AutonomousHub /></ProtectedRoute>} />
        <Route path="/operator/carshare-hub" element={<ProtectedRoute role="operator"><CarShareHub /></ProtectedRoute>} />
        <Route path="/operator/operations-hub" element={<ProtectedRoute role="operator"><OperationsHub /></ProtectedRoute>} />

        {/* CarShare routes */}
        <Route path="/carshare/register" element={<ProtectedRoute role="passenger"><CarShareRegister /></ProtectedRoute>} />
        <Route path="/carshare/request-vehicle" element={<ProtectedRoute role="passenger"><CarShareRequestVehicle /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
