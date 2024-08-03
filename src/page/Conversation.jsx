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
    const { senderId, receiverId } = useParams();

    const fetchMessage = async () => {
        setLoading(true);
        const result = await getMessage(senderId, receiverId, token);
        setData(result);
        setLoading(false);
        console.log("DATA FROM CONVERSATION", result);
    }

    useEffect(() => {
        fetchMessage();
    }, [senderId, receiverId,]);

    return (
        <div className='md:p-12 p-2 md:ml-6 rounded-full md:mt-5 w-[100%] gap-2 flex flex-col justify-center items-center'>
            <div className={`post w-full ${dark ? "dark-card" : "light-card"} h-screen rounded-lg mb-4 p-4`}>
                <div className={`flex justify-between ${dark ? "dark" : "light"} p-2 rounded-lg`}>
                    <div className='flex justify-start'>
                        <Link to="/chat">
                            <IoArrowBackCircleSharp style={{ width: "30", height: "30" }} />
                        </Link>
                    </div>
                    <div className='font-bold'>Conversation</div>
                </div>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data ? (
                            // Render the messages here, e.g.:
                            data.map((message, index) => (
                                <div key={index}>ss</div>
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
