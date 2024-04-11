import React, { useState, useEffect } from 'react';
import { followSelectedUser, unfollowSelectedUser } from '../../services/operations/profileAPI';
import { useSelector } from 'react-redux';

export default function FollowUnfollow({ profileData, follow, unfollow }) {
    const userIdToFollowOrUnFollow = profileData?._id;
    const { user,dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    
    const [isFollowed, setIsFollowed] = useState(false);

    
useEffect(() => {
    if (profileData && profileData.followers) {
        const isAlreadyFollowed = profileData.followers.some((userId) => userId === user?._id);
        setIsFollowed(isAlreadyFollowed);
    }
}, [profileData, user]);


    
    const handleFollow = async () => {
        const success = await followSelectedUser(userIdToFollowOrUnFollow, token);
        if (success) {
            setIsFollowed(true); 
        }
    };

    
    const handleUnfollow = async () => {
        const success = await unfollowSelectedUser(userIdToFollowOrUnFollow, token);
        if (success) {
            setIsFollowed(false); 
        }
    };

    return (
        <div className={`${dark ? "border-white hover:bg-[#FFFD00] hover:text-black " : "border-black hover:text-black hover:bg-[#c9ddf7] "} border-2 rounded-full font-bold py-1 px-4`} >
            <button className='hover:dark-highlight'
                onClick={isFollowed ? handleUnfollow : handleFollow}
            >
                {isFollowed ? unfollow : follow}
            </button>
        </div>
    );
}