import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (username === "Bima" && password === "123456") {
      alert("Login berhasil!");
      navigate("/dashboard");
    } else {
      alert("Username atau password salah!");
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    alert("Akun berhasil dibuat (simulasi). Silakan login.");
    setIsSignUp(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#fefae0] font-serif px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/background/20230527/original/pngtree-an-old-bookcase-in-a-library-picture-image_2760144.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.form
                key="signin"
                onSubmit={handleSignInSubmit}
                className="w-full max-w-xs flex flex-col items-center absolute"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#3e1f0d] mb-4">Sign In</h2>

                {/* Username input with icon */}
                <div className="w-full relative mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#bcbcbc] text-[#333] text-sm outline-none"
                  />
                  <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#3e1f0d]" />
                </div>

                {/* Password input with icon */}
                <div className="w-full relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-[#bcbcbc] text-[#333] text-sm outline-none"
                  />
                  <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#3e1f0d]" />
                  <FaEye
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#3e1f0d] ${showPassword ? "hidden" : ""}`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <FaEyeSlash
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#3e1f0d] ${!showPassword ? "hidden" : ""}`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                <div className="flex gap-3 my-3">
                  <div className="bg-[#3e1f0d] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:scale-110 transition-transform">
                    <FaGoogle />
                  </div>
                  <div className="bg-[#3e1f0d] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:scale-110 transition-transform">
                    <FaFacebookF />
                  </div>
                </div>

                <p className="text-xs text-[#3e1f0d] mb-3">
                  Lupa akun? <a href="#" className="text-[#646464] hover:underline">Klik di sini</a>
                </p>
                <button
                  type="submit"
                  className="bg-[#3e1f0d] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2d1810] w-full"
                >
                  Masuk
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignUpSubmit}
                className="w-full max-w-xs flex flex-col items-center absolute"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#3e1f0d] mb-4">Sign Up</h2>

                {/* Username input with icon */}
                <div className="w-full relative mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#bcbcbc] text-[#333] text-sm outline-none"
                  />
                  <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#3e1f0d]" />
                </div>

                {/* Email input with icon */}
                <div className="w-full relative mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#bcbcbc] text-[#333] text-sm outline-none"
                  />
                  <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#3e1f0d]" />
                </div>

                {/* Password input with icon */}
                <div className="w-full relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-[#bcbcbc] text-[#333] text-sm outline-none"
                  />
                  <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#3e1f0d]" />
                  <FaEye
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#3e1f0d] ${showPassword ? "hidden" : ""}`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <FaEyeSlash
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#3e1f0d] ${!showPassword ? "hidden" : ""}`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                <div className="flex gap-3 my-3">
                  <div className="bg-[#3e1f0d] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:scale-110 transition-transform">
                    <FaGoogle />
                  </div>
                  <div className="bg-[#3e1f0d] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:scale-110 transition-transform">
                    <FaFacebookF />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#3e1f0d] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2d1810] w-full"
                >
                  Daftar
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-[#3e1f0d] text-[#fefae0] flex flex-col items-center justify-center text-center p-6 md:rounded-tl-[80px] md:rounded-bl-[80px]">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Selamat Datang!</h2>
          <p className="text-sm md:text-base mb-4">
            {isSignUp ? "Sudah punya akun?" : "Belum punya akun?"}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="bg-[#fefae0] text-[#3e1f0d] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#eee1bb]"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
