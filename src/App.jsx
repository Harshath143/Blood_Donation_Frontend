import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/userStore';

// Layout & Global Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EmergencyBanner } from './components/ui/EmergencyBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { DonatePage } from './pages/DonatePage';
import { RequestBloodPage } from './pages/RequestBloodPage';
import { FindDonorsPage } from './pages/FindDonorsPage';
import { BloodBanksPage } from './pages/BloodBanksPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { LearnPage } from './pages/LearnPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Protected Route Component for Dashboard
const ProtectedRoute = ({ children }) => {
  const user = useUserStore(state => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'font-sans font-semibold text-xs',
          success: {
            duration: 3000,
            style: {
              background: '#27AE60',
              color: '#FFFFFF'
            }
          },
          error: {
            duration: 3500,
            style: {
              background: '#C0392B',
              color: '#FFFFFF'
            }
          }
        }}
      />

      {/* Emergency Sliding Banner */}
      <EmergencyBanner />

      <div className="min-h-screen flex flex-col bg-brand-bg">
        {/* Navigation Bar */}
        <Navbar />

        {/* Routes Container */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/request-blood" element={<RequestBloodPage />} />
          <Route path="/find-donors" element={<FindDonorsPage />} />
          <Route path="/blood-banks" element={<BloodBanksPage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Fallback routing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
