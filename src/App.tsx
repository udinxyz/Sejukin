import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import LoginSuccessPage from '@/pages/LoginSuccessPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login-success" element={<LoginSuccessPage />} />
        {/* Future routes:
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/history" element={<ServiceHistoryPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/technician/*" element={<TechnicianRoutes />} />
        */}
      </Routes>
    </Router>
  )
}
