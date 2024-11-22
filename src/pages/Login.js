import React, { useState } from "react";
import { login } from "../utils/api"; // Import the API function

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      setLoading(true); // Start loading
      console.log("Submitting Login Data:", formData); // Log submitted data
      const response = await login(formData); // Call the login API
      console.log("API Response:", response); // Log the API response
  
      if (response.token) {
        alert("Login successful!");
        localStorage.setItem("token", response.token); // Save token in localStorage
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        throw new Error(response.message || "Unexpected error occurred.");
      }
    } catch (err) {
      console.error("Login Error:", err); // Log error details
      setError(err.response?.data?.message || "Invalid login credentials.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md shadow-2xl bg-white p-5 sm:p-6 lg:p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control w-full">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm sm:text-base">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
