// import FloatingShape from "./components/FloatingShape"
import { Navigate, Route, Routes } from "react-router-dom"

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from "./pages/EmailVerificationPage";

import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashBoardPage from "./pages/DashBoardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

//protect routes that require authentication

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(!isAuthenticated || !user.isVerified) {
    return <Navigate to="/login" replace/>
  }

  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace/>
  }

  return children;
}

//redirect authenticated users to homepage
const RedirectAutheticatedUsers = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  
  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace/>
  }

  return children
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
        <LoadingSpinner />
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1d] flex items-center justify-center relative overflow-hidden
    ">
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <DashBoardPage />
        </ProtectedRoute>} />
        <Route path="/signup" element={<RedirectAutheticatedUsers>
          <SignUpPage />
        </RedirectAutheticatedUsers>} />
        <Route path="/login" element={<RedirectAutheticatedUsers>
          <LoginPage />
        </RedirectAutheticatedUsers>} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={
          <RedirectAutheticatedUsers>
            <ForgotPasswordPage />
          </RedirectAutheticatedUsers>
        } />
        <Route
        path="/reset-password/:token"
        element={
          <RedirectAutheticatedUsers>
            <ResetPasswordPage />
          </RedirectAutheticatedUsers>
        }
        />
        <Route
        path="*"
        element={
          <NotFound />
        }
        />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
