import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { getMessage } from '../services/operations/conversationAPI';

export default function Conversation() {
    const { user, dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { senderId, receiverId , name} = useParams();

    const fetchMessage = async () => {
        setLoading(true);
        const result = await getMessage(senderId, receiverId, token);
        setData(result);
        setLoading(false);
        console.log("DATA FROM CONVERSATION", result);
    }

    useEffect(() => {
        fetchMessage();
    }, [senderId, receiverId, token]);

    return (
        <div className='md:p-12 p-2 md:ml-6 rounded-full md:mt-5 w-[100%] gap-2 flex flex-col justify-center items-center'>
            <div className={`post flex flex-col gap-3 w-full ${dark ? "dark-card" : "light-card"} h-screen rounded-lg mb-4 p-4`}>
                <div className={`flex justify-between ${dark ? "dark" : "light"} p-2 rounded-lg`}>
                    <div className='flex justify-start'>
                        <Link to="/chat">
                            <IoArrowBackCircleSharp style={{ width: "30px", height: "30px" }} />
                        </Link>
                    </div>
                    <div className='font-bold'>{name }</div>
                </div>
                <div className={`overflow-y-auto h-full  ${dark ? "dark" : "light"} p-3 rounded-lg`}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data ? (
                            data.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`flex ${message?.senderId === user?._id ? "justify-end" : "justify-start"} mb-2`}
                                >
                                    <div 
                                        className={`p-2 rounded-lg ${message.senderId === user._id ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
                                    >
                                        {message.message}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No messages found.</p>
                        )
                        
                    )}
                </div>
            </div>
        </div>
    )
}
