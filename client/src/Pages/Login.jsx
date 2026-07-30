import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_SCANTAP_API_BASE_URL ||
  "https://scantap.onrender.com/api"
).replace(/\/$/, "");

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setMessage(data.message || "Login successful.");
        if (data.role === "admin") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(`/edit/${data.userId}`);
        }
      } else {
        setSubmitSuccess(false);
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setSubmitSuccess(false);
      setMessage(
        error.message || "Could not connect to the server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage:
          "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Blur Layer */}
      <div className="absolute inset-0"></div>

      {/* Modal Container */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-6"
          style={{
            backgroundImage:
              "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
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
              onClick={() => {
                setIsOpen(false);
                navigate("/");
              }}
              className="absolute -right-4 -top-4 w-12 h-12 bg-[#1a237e] text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
              <h2 className="text-3xl font-bold text-center text-[#1a237e]">
                Login
              </h2>

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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#1a237e]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showPassword
                            ? "M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c7 0 10 8 10 8a17.8 17.8 0 0 1-2.2 3.5M6.6 6.7C3.5 8.7 2 12 2 12s3 8 10 8a10.7 10.7 0 0 0 5.2-1.3"
                            : "M2 12s3-8 10-8 10 8 10 8-3 8-10 8S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        }
                      />
                    </svg>
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#87CEEB] text-[#1a237e] font-semibold py-3 rounded-xl hover:bg-[#75bde0] transition-colors text-lg"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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
