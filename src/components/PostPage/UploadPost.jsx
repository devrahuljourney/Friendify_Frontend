import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from '../../services/operations/postAPI';

export default function UploadPost({fetchFeedData}) {
    const { dark, user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        file: null, 
        caption: ""
    });

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            
            if (files.length > 0) {
                setFormData({ ...formData, [name]: files[0] });
            } else {
                setFormData({ ...formData, [name]: null });
            }
        } else {
            
            setFormData({ ...formData, [name]: value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        await createPost(formData.file, formData.caption, token);
        fetchFeedData();
    };

    return (
        <div className={` ${dark ? "dark" : "light"}  `}>
            <form onSubmit={submitHandler} className={`rounded-lg mb-4 p-4 ${dark ? "dark-card" : "light-card"} flex flex-col `}>
                <div className='flex flex-row gap-4 p-3 ' >
                    <div className='w-14 h-14 rounded-full'>
                        <img className='object-cover w-14 h-14 rounded-full' src={user?.additionalDetails?.image} alt='userimage' />
                    </div>
                    <label className='  w-[80%] bg-transparent ' htmlFor="caption">
                        <input placeholder='Start a Post' className= {` border-gray-200 border-2 p-3 rounded-full  w-full bg-transparent `} id='caption' value={formData.caption} onChange={changeHandler} type='text' name='caption' />
                    </label>
                </div>

                <div className='flex justify-evenly items-center' >
                    <label htmlFor='file'>
                        <input className='bg-transparent' id='file' onChange={changeHandler} name='file' type='file' />
                    </label>
                    <button className={` font-semibold ${dark ? " dark-highlight  ":" light-highlight"} hover:bg-gray-200 p-3  flex justify-center items-center rounded-xl `}  type="submit">Post</button>
                </div>
                
            </form>
        </div>
    );
}
