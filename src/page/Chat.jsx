import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import UserSortProfile from '../components/common/UserSortProfile';
import { getMessegedUser } from '../services/operations/conversationAPI';

function Chat() {
    const { user, dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (user?._id && token) {
            setLoading(true);
            const result = await getMessegedUser(user?._id, token);
            setData(result);
            setLoading(false);
            console.log("RESULT FROM CHAT", result);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user, token]);

    return (
        <div  className='md:p-12 p-2 md:ml-6 rounded-full md:mt-5  w-[100%] gap-2 flex flex-col justify-center items-center'>
            <div className= {`post w-full   ${dark ? "dark-card" : " light-card  "}   rounded-lg mb-4 p-4 `}>
            <div className='flex justify-start' >
                <Link to="/">
                    <IoArrowBackCircleSharp style={{ width: "30", height: "30" }} />
                </Link>
                
            </div>
            
            {loading ? (
                <Spinner />
            ) : data ? (
                <div>
                    {data?.map((conversation) => (
                        <Link 
                            key={conversation._id} 
                            to={`/chat/senderId/${user._id}/receiverId/${conversation.members[1]._id}`}
                        >
                            <UserSortProfile data={conversation.members[1]} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p className='font-bold ' >You haven't messaged anyone</p>
            )}
        </div>
        </div>
    );
}

export default Chat;
