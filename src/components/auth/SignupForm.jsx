import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';
import { sendOtp } from '../../services/operations/authAPI';
import { useNavigate,Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SignupForm() {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }

    console.log("Form submitted:", formData);

    // Dispatch login action with formData
    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
       <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <form className="loginform rounded p-8 shadow-md w-[350px] h-[400px] flex flex-col justify-center " onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="w-full bg-[#5c5470] font-bold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"> { loading ? "Signing..." : "Sign in" } </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-700"><Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login here.</Link></p>
        
      </div>
    </div>
  );
}
