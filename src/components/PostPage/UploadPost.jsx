import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from '../../services/operations/postAPI';

export default function UploadPost({fetchFeedData}) {
    const { dark, user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        file: null, // Initialize file state to null
        caption: ""
    });

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            // Update file state for file input
            if (files.length > 0) {
                setFormData({ ...formData, [name]: files[0] });
            } else {
                setFormData({ ...formData, [name]: null });
            }
        } else {
            // Update other input fields as usual
            setFormData({ ...formData, [name]: value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // Call createPost function with formData, caption, and token
        await createPost(formData.file, formData.caption, token);
        fetchFeedData();
    };

    return (
        <div className={` ${dark ? "dark" : "light"}  `}>
            <form onSubmit={submitHandler} className={`rounded-lg mb-4 p-4 ${dark ? "dark-card" : "light-card"}`}>
                <div>
                    <div className='w-14 h-14 rounded-full'>
                        <img className='object-cover w-14 h-14 rounded-full' src={user?.additionalDetails?.image} alt='userimage' />
                    </div>
                    <label htmlFor="caption">
                        <input id='caption' value={formData.caption} onChange={changeHandler} type='text' name='caption' />
                    </label>
                </div>

                <div>
                    <label htmlFor='file'>
                        <input id='file' onChange={changeHandler} name='file' type='file' />
                    </label>
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}
