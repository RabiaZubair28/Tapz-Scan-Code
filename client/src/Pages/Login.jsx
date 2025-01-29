import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    try {
      const response = await fetch('http://localhost:3500/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user), // Correctly send the user object as JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        navigate(`/edit/${data.userId}`);
      } else {
        console.log('Login failed:', data.message);
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

  };


  
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background Blur Layer */}
      <div className="absolute inset-0 backdrop-blur"></div>

      {/* Modal Container */}
      {isOpen && (
  <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-3xl p-6 max-w-md w-full relative shadow-lg"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {setIsOpen(false)
          navigate("/home")
        }}
        className="absolute -right-4 -top-4 w-12 h-12 bg-[#1a237e] text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Content */}
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-center mb-4">
          <img
            src="https://liamcrest.com/assets/static/CONTACT%20US%20IMAGE-N1-01.png"
            alt="Illustration of people communicating"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-[#1a237e]">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={handleInput}
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#87CEEB] text-[#1a237e] font-semibold py-3 rounded-xl hover:bg-[#75bde0] transition-colors text-lg"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {/* Success/Error Messages */}
        {submitSuccess === true && (
          <p className="text-green-500 mt-4">{message}</p>
        )}
        {submitSuccess === false && (
          <p className="text-red-500 mt-4">{message}</p>
        )}
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
}

export default Login;