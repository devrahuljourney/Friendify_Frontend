import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../services/operations/authAPI";
import { useNavigate, Link } from 'react-router-dom';
import "../../App.css"
export default function LoginForm() {

  const {loading} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    
    setFormData({
      email: "",
      password: ""
    });

    // Dispatch login action with formData
    dispatch(login(formData.email, formData.password, navigate));
  };

  const {dark} = useSelector((state) => state.profile)

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className= {` ${dark ? "loginform-dark" : "loginform-light"}  p-8 rounded shadow-md md:w-[400px] w-[300px] h-[300px] flex flex-col justify-center`}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-500">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='Enter Your Email'
            className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-500">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder='Enter Your Password'
            onChange={handleChange}
            required
            className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
          />
        </div>
        <button type="submit" className={`w-full ${dark ?"dark-highlight": "light-highlight"} font-bold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300`}> { loading ? "Logging..." : "Login" } </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-700"><Link to="/signup" className="text-blue-500 hover:underline">Don't have an account? Sign Up here.</Link></p>
        <p className="text-gray-700"><Link to="/reset-password" className="text-blue-500 hover:underline">Forgot Password</Link></p>
      </div>
    </div>
  );
}
