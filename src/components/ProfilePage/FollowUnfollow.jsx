import React, { useState, useEffect } from 'react';
import { followSelectedUser, unfollowSelectedUser } from '../../services/operations/profileAPI';
import { useSelector } from 'react-redux';

export default function FollowUnfollow({ profileData, follow, unfollow }) {
    const userIdToFollowOrUnFollow = profileData?._id;
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    // State to track whether the user is followed or not
    const [isFollowed, setIsFollowed] = useState(false);

    // Check if the user is already followed when component mounts
    useEffect(() => {
        const isAlreadyFollowed = profileData?.followers.some((userId) => userId === user?._id);
        setIsFollowed(isAlreadyFollowed);
    }, [profileData, user]);

    // Function to handle follow action
    const handleFollow = async () => {
        const success = await followSelectedUser(userIdToFollowOrUnFollow, token);
        if (success) {
            setIsFollowed(true); // Update state if follow is successful
        }
    };

    // Function to handle unfollow action
    const handleUnfollow = async () => {
        const success = await unfollowSelectedUser(userIdToFollowOrUnFollow, token);
        if (success) {
            setIsFollowed(false); // Update state if unfollow is successful
        }
    };

    return (
        <div>
            <button 
                onClick={isFollowed ? handleUnfollow : handleFollow}
            >
                {isFollowed ? unfollow : follow}
            </button>
        </div>
    );
}
