// import FloatingShape from "./components/FloatingShape"
import { Route, Routes } from "react-router-dom"

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <div className="min-h-screen bg-[#1a1a1d] flex items-center justify-center relative overflow-hidden
    ">
      {/* <FloatingShape
        color="bg-purple-300"
        size="w-640 h-640"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-red-500"
        size="w-480 h-480"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-gray-800"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      /> */}

      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </div>
  )
}

export default App
