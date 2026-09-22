import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import LoginSuccessPage from '@/pages/LoginSuccessPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import MyACUnitsPage from '@/pages/dashboard/MyACUnitsPage'
import BookingPage from '@/pages/dashboard/BookingPage'
import ServiceHistoryPage from '@/pages/dashboard/ServiceHistoryPage'
import ProfilePage from '@/pages/dashboard/ProfilePage'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login-success" element={<LoginSuccessPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/units"
            element={
              <ProtectedRoute>
                <MyACUnitsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <ProtectedRoute>
                <ServiceHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
