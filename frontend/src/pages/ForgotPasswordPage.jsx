import {motion} from "framer-motion"
import { useState } from "react"
import Input from './../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {isLoading, forgotPassword} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Forgot Password</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">Enter your email address and we will send you a password reset link.</p>
            <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <motion.button
            className="
              mt-5 w-full py-3 px-4 
              bg-gradient-to-r from-blue-500 to-purple-600 
              text-white font-bold 
              rounded-lg shadow-lg 
              hover:from-blue-600 hover:to-purple-700 
              focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 
              focus:ring-offset-gray-900 transition duration-200
            "
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type="submit"
            disabled={isLoading}
            >
            {isLoading ? <Loader className="animate-spin mx-auto size={24}" /> : "Send Reset Link"}
            </motion.button>
          </form>
        ) : (
          <div className='text-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'
          >
            <Mail className='h-8 w-8 text-blue-300' />
          </motion.div>
          <p className='text-gray-300 mb-6'>
            If an account exists for {email}, you will receive a password reset link shortly.
          </p>
        </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 opacity-50 flex justify-center">
        <Link to="/login" className="text-sm text-purple-200 hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>

  )
}

export default ForgotPasswordPage