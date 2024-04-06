import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchProfileById } from '../../services/operations/profileAPI';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";

import cover from "../../assets/cover.png"
import FollowUnfollow from './FollowUnfollow';
export default function ProfilePage({userId}) {

    const [profileData, setProfileData] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const fetchProfileData = async () => {
        try {
            console.log("userId ", userId);
            console.log("TOken ", token)
            const response = await fetchProfileById(userId,token);
            setProfileData(response);
            console.log("Response ", response)
        } catch (error) {
            console.log("Error in api fetching ", error)
        }
    }

    useEffect(() => {
        fetchProfileData()
    }, []);

    const {dark,user} = useSelector((state) => state.profile)
  return (
    <div className='p-7'>
        <div className= {`post   ${dark ? "dark-card" : " light-card  "}   rounded-lg mb-4 p-4 `} >
            <div className='flex gap-4' >
                <div>
                    <Link to="/" > < IoArrowBackCircleSharp style = {{width:"25", height:"25"}}/> </Link>
                </div>
                <div>
                    <p> {profileData?.firstname} {profileData?.lastname} </p>
                    <p> { profileData?.posts.length > 0 ? profileData?.posts.length : "0" } Posts </p>
                </div>
            </div>


            <div>
                {/* cover img */}
                <div>
                    <img src={cover} alt='coverimg' />
                </div>

                <div className=' flex flex-row justify-evenly  items-start '>
                   <div className=' flex flex-col  relative w-[150px] h-[150px] ' >
                       <img className={` border-4 border-gray-400 w-[150px] h-[150px] rounded-full object-cover  absolute right-[80%] bottom-[50%]`} src={profileData?.additionalDetails?.image} alt='profileimage' />
                       
                       <div className='relative' >
                        <p className=' font-bold text-[22px] absolute translate-y-20 -translate-x-20 ' > {profileData?.firstname} {profileData?.lastname} </p>
                       </div>


                   </div>
                   <div>
                    {
                        user._id === userId ? (
                            <Link to={`/edit/${user._id}`} >Edit Profile</Link>
                        ) :
                        (
                            <FollowUnfollow follow={"Follow"} unfollow={"Unfollow"}  profileData = {profileData} />
                        )
                    }
                   </div>
                </div>
            </div>

              



        </div>
    </div>
  )
}
