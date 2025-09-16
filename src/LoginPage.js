import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import credentials from "./credentials.json";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Role-based login check
    if (
      credentials[role] &&
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      // On successful login, redirect to the appropriate dashboard
      const dashboardPath = {
        student: '/student-dashboard',
        teacher: '/teacher-dashboard',
        HR: '/hr-dashboard',
        registrar: '/registrar-dashboard',
        accounts: '/accountant-dashboard',
      }[role];

      if (dashboardPath) {
        navigate(dashboardPath);
      } else {
        setError(`Dashboard for role "${role}" is not available yet.`);
      }
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-sans flex items-center justify-center p-4 relative">
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </Link>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-4 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
            <span className="font-bold text-lg">ERP</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ARPANAP</h1>
            <p className="text-sm text-gray-300">The future of Education Management</p>
          </div>
        </Link>
        <div className="bg-black/20 p-8 rounded-2xl shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-6">Login to your account</p>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded-lg p-3 mb-4 text-center">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="HR">H R</option>
                <option value="registrar">Registrar</option>
                <option value="accounts">Accountant</option>
                <option value="library">Librarian</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="password"
                type="password"
                placeholder="******************"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right">
                <a href="#" className="text-sm text-purple-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transform hover:-translate-y-0.5 transition"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}