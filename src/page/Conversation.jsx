import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { getMessage, sendMessage } from '../services/operations/conversationAPI';
import socket from '../services/apis';

export default function Conversation() {
    const { user, dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { senderId, receiverId, name } = useParams();
    const [message, setMessage] = useState("");

    const fetchMessage = async () => {
        setLoading(true);
        const result = await getMessage(senderId, receiverId, token);
        setData(result);
        setLoading(false);
        console.log("DATA FROM CONVERSATION", result);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            await sendMessage(senderId, receiverId, message, token);
            socket.emit("sendMessage", { senderId, receiverId, message });
            setMessage(""); 
            fetchMessage(); 
        }
    };

    useEffect(() => {
        fetchMessage();

        socket.on('receiveMessage', (data) => {
            setData((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [senderId, receiverId, token]);

    useEffect(() => {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [data]);

    return (
        <div className='md:p-12 p-2 md:ml-6 rounded-full md:mt-5 w-[100%] gap-2 flex flex-col justify-center items-center'>
            <div className={`post flex flex-col gap-3 w-full ${dark ? "dark-card" : "light-card"} h-screen rounded-lg mb-4 p-4`}>
                <div className={`flex justify-between ${dark ? "dark" : "light"} p-2 rounded-lg`}>
                    <div className='flex justify-start'>
                        <Link to="/chat">
                            <IoArrowBackCircleSharp style={{ width: "30px", height: "30px" }} />
                        </Link>
                    </div>
                    <Link to={`/profile/${receiverId}`} className='font-bold'>{name}</Link>
                </div>
                <div className={`overflow-y-auto h-full ${dark ? "dark" : "light"} p-3 rounded-lg messages-container`}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data.length > 0 ? (
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
                <form onSubmit={submitHandler} className='flex w-full justify-between gap-2'>
                    <textarea 
                        type='text' 
                        onChange={(e) => setMessage(e.target.value)} 
                        value={message} 
                        name='message' 
                        className={` ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00] " : "light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2 px-4 py-2 w-[90%] md:w-[90%] rounded-lg `}
                    />
                    <button type='submit' className={`font-semibold ${dark ? "dark-highlight" : "light-highlight"} hover:bg-gray-200 p-3 w-[10%] flex justify-center items-center rounded-xl`}>Send</button>
                </form>
            </div>
        </div>
    );
}
