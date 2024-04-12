import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function EditProfile() {
    const { dark, user } = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        mobileNumber: "",
        gender: "",
        dob: "",
        about: "",
        bio: "",
        link: "",
        location: "",
        profileimage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profileimage") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className={`bg-${dark ? "dark" : "light"} text-${dark ? "white" : "black"} h-screen  md:p-7 md:mt-10 md:ml-5`}>
            <div className={`post ${dark ? "dark-card" : "light-card"} rounded-lg mb-4 md:p-4 `}>
                <p className='text-xl font-semibold'>Edit Profile</p>
                <form className='flex flex-col gap-4 justify-center items-start' onSubmit={handleSubmit}>

                    <div className='flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4'>
                        <label htmlFor='file' className='cursor-pointer'>
                            <span className='text-lg'>Select Profile Image Here</span>
                            <div className='w-24 h-24 border border-dashed border-gray-400 flex items-center justify-center rounded-lg mt-2'>
                                {formData.profileimage ? (
                                    <img src={URL.createObjectURL(formData.profileimage)} alt="Profile" className='w-full h-full object-cover rounded-lg' />
                                ) : (
                                    <img src={user?.additionalDetails?.image} alt='profileImage' className='w-full h-full object-cover rounded-lg' />
                                )}
                            </div>
                        </label>
                        <input className='hidden' id='file' type='file' name='profileimage' onChange={handleChange} />
                    </div>

                    <div className='flex gap-5' >
                        <label className='flex flex-col'>
                            <span>First Name</span>
                            <input  type='text' name='firstname' value={formData.firstname} onChange={handleChange} placeholder='Enter First Name' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `} />
                        </label>
                        <label className='flex flex-col'>
                            <span>Last Name</span>
                            <input type='text' name='lastname' value={formData.lastname} onChange={handleChange} placeholder='Enter Last Name' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[300px] rounded-full `} />
                        </label>
                    </div>

                    <label className='flex flex-col'>
                        <span>Mobile Number</span>
                        <input type='text' name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} placeholder='Enter Mobile Number' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>
                    <label className='flex flex-col'>
    <span>Gender</span>
    <select 
        name='gender' 
        value={formData.gender} 
        onChange={handleChange} 
        className={` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `}
    >
        <option value="" disabled>Select Your Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    </select>
</label>

                    <label className='flex flex-col'>
                        <span>Date of Birth</span>
                        <input type='text' name='dob' value={formData.dob} onChange={handleChange} placeholder='Enter Your DOB' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>
                    <label className='flex flex-col'>
                        <span>About</span>
                        <textarea type='text' name='about' value={formData.about} onChange={handleChange} placeholder='Write somthing about you...' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>
                    <label className='flex flex-col'>
                        <span>Bio</span>
                        <textarea type='text' name='bio' value={formData.bio} onChange={handleChange} placeholder='Enter your bio' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>
                    <label className='flex flex-col'>
                        <span>Link</span>
                        <input type='text' name='link' value={formData.link} onChange={handleChange} placeholder='Paste url' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>
                    <label className='flex flex-col'>
                        <span>Location</span>
                        <input type='text' name='location' value={formData.location} onChange={handleChange} placeholder='Enter Your Location' className= {` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] ":"light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2   px-4 py-2 w-[200px] md:w-[500px] rounded-full `} />
                    </label>

                    <button type="submit" className= {`${dark ? "dark-highlight" : "light-highlight"} font-bold py-2 px-4 rounded`} >
                        Save
                    </button>
                </form>
            </div>

        </div>
    );
}
