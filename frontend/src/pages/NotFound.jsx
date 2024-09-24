import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1d] text-white p-4">
      <div className="relative w-64 h-64 mb-8">
        {/* Cat SVG with Tail Animation */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          className="w-full h-full"
        >
          {/* Cat Body */}
          <g id="cat-body">
            <ellipse cx="150" cy="200" rx="70" ry="40" fill="#3498db" />
            <circle cx="150" cy="120" r="50" fill="#3498db" />
          </g>
          {/* Cat Eyes */}
          <g id="cat-eyes">
            <circle cx="130" cy="110" r="5" fill="#000" />
            <circle cx="170" cy="110" r="5" fill="#000" />
          </g>
          {/* Cat Nose */}
          <polygon points="150,120 145,130 155,130" fill="#2980b9" />
          {/* Cat Mouth */}
          <path d="M145 135 Q150 140 155 135" stroke="#2980b9" strokeWidth="2" fill="none" />
          {/* Cat Tail */}
          <motion.path
            d="M220 190 Q250 160 220 130"
            stroke="#3498db"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: [0, 20, 0],
              transformOrigin: '220px 190px',
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page Not Feline
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! It seems our curious cat has wandered off with this page.
      </motion.p>

      {showMessage && (
        <motion.div
          className="text-lg text-blue-300 mb-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Maybe it's hiding in a cardboard box? 📦🐱
        </motion.div>
      )}

      <Link to="/login">
        <motion.button
          className="bg-blue-400 text-[#1a1a1d] px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Paw-se and Return to Login
        </motion.button>
      </Link>

      <motion.div
        className="mt-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        If you believe this is a cat-astrophe, please contact our support team.
      </motion.div>
    </div>
  )
}
