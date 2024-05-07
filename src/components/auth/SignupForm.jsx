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

  const {dark} = useSelector((state) => state.profile)

  return (
    <div className="flex flex-col justify-center items-center h-screen">
       <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <form className= {` ${dark ? "loginform-dark" :"loginform-light"} rounded p-8 shadow-md md:w-[350px] w-[300px] h-[400px] flex flex-col justify-center`} onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <input
          className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
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
            className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
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
            className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
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
          className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
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
          className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className= {`w-full ${dark ? "dark-highlight" : " light-highlight"} font-bold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300`}> { loading ? "Signing..." : "Sign in" } </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-700"><Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login here.</Link></p>
        
      </div>
    </div>
  );
}
