import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore()

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      // Accept only digits or empty string
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, ""); // Remove non-digit characters
    const pastedCode = pastedData.slice(0, 6 - index).split("");
    const newCode = [...code];

    for (let i = 0; i < pastedCode.length; i++) {
      if (index + i < 6) {
        newCode[index + i] = pastedCode[i];
      }
    }

    setCode(newCode);
    const focusIndex = index + pastedCode.length - 1;
    if (focusIndex < 6) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the verification code that was sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(eL) => (inputRefs.current[index] = eL)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 bg-opacity-90 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white rounded-lg focus:outline-none"
              />
            ))}
          </div>
            {error && (
              <p className="text-red-500 text-center font-semibold">{error}</p>
            )}
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
