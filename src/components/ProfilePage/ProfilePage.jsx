import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchProfileById } from '../../services/operations/profileAPI';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { format } from 'date-fns';
import cover from "../../assets/cover.png"
import FollowUnfollow from './FollowUnfollow';
import { FaBirthdayCake } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import PostCard from '../PostPage/PostCard';
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
    }, [userId]);

    const {dark,user} = useSelector((state) => state.profile)
    const dobString = profileData?.additionalDetails?.dob;
    let formattedDob = '';
    if (profileData?.additionalDetails?.dob) {
        const dobString = profileData.additionalDetails.dob;
        const dobDate = new Date(dobString);
        if (!isNaN(dobDate.getTime())) {
            formattedDob = format(dobDate, 'MMMM dd, yyyy');
        } else {
            formattedDob = "Invalid Date"; // Handle invalid date
        }
    }
    let formattedcreatedAt = '';
if (profileData?.additionalDetails?.createdAt) { // Corrected property name to createdAt
    const createAtString = profileData.additionalDetails.createdAt; // Corrected property name to createdAt
    const createAtDate = new Date(createAtString);
    if (!isNaN(createAtDate.getTime())) {
        formattedcreatedAt = format(createAtDate, 'MMMM dd, yyyy');
    } else {
        formattedcreatedAt = "Invalid Date"; // Handle invalid date
    }
}

  return (
    <div className={` ${dark ? "dark" : "light"} h-screen md:p-7 `}>
        <div className= {`post   ${dark ? "dark-card" : " light-card  "}   rounded-lg mb-4 md:p-4 `} >
            <div className='flex gap-4' >
                <div>
                    <Link to="/" > < IoArrowBackCircleSharp style = {{width:"30", height:"30"}}/> </Link>
                </div>
                <div>
                    <p> {profileData?.firstname} {profileData?.lastname} </p>
                    <p> { profileData?.posts.length > 0 ? profileData?.posts.length : "0" } Posts </p>
                </div>
            </div>


            <div className='flex flex-col' >
                {/* cover img */}
                <div>
                    <img src={cover} alt='coverimg' />
                </div>

                <div className=' w-full flex flex-row justify-evenly  items-start '>
                   <div  >
                   <div className='   flex flex-col  relative md:w-[150px] md:h-[150px] w-[120px] h-[120px] ' >
                       <img className={` border-4 border-gray-400 md:w-[150px] md:h-[150px] w-[120px] h-[120px] rounded-full object-cover  absolute md:right-[80%]  bottom-[50%] md:bottom-[50%]`} src={profileData?.additionalDetails?.image} alt='profileimage' />
            
                   </div  >
                   <div className='relative w-full ' >
                        <p className=' w-full font-bold text-[22px] md:-translate-x-20 -translate-y-10 md:-translate-y-16 ' > {profileData?.firstname} {profileData?.lastname} </p>
                        
                    </div>
                </div>
                   
                   <div className=' translate-y-4  md:translate-x-9 ' >
                    {
                        user._id === userId ? (
                            <Link className={`${dark ? "border-white hover:bg-[#FFFD00] hover:text-black " : "border-black hover:text-black hover:bg-[#c9ddf7] "} border-2 rounded-full font-bold py-1 px-4`} to={`/edit/${user._id}`} >Edit Profile</Link>
                        ) :
                        (
                            <FollowUnfollow follow={"Follow"} unfollow={"Unfollow"}  profileData = {profileData} />
                        )
                    }
                   </div>
                </div>

                
            </div>



            <div className=' flex flex-col md:-translate-y-20  -translate-y-12 p-4 ' >
                <div className='font-bold text-gray-500' >
                   <p> {profileData?.additionalDetails?.bio} </p>
                </div>

                <div className='flex flex-row  justify-between ' >
                    <div>
                        {
                            profileData?.additionalDetails?.location && (
                                <div className=' flex flex-row gap-2 justify-center items-center' >
                                    <FaLocationDot/>
                                    {
                                        profileData?.additionalDetails?.location
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                    {
                            profileData?.additionalDetails?.dob && (
                                <div className=' flex flex-row gap-2 justify-center items-center'>
                                    <FaBirthdayCake/>
                                    {
                                        formattedDob
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                    {
                            profileData?.createdAt && (
                                <div className=' flex flex-row gap-2 justify-center items-center'>
                                    <FaCalendarAlt/> Join at 
                                    {
                                        formattedcreatedAt
                                    }
                                </div>
                            )
                        }
                    </div>

                    
                </div>

            </div>

                   <div className='flex md:-translate-y-20  -translate-y-12 p-4 flex-row font-bold  justify-start gap-4 ' >
                     <div className='text-bold' >
                        {
                            profileData?.followers.length > 0 ? (profileData?.followers?.length ) : "0"

                        } Followers
                      </div>
                      <div className='text-bold'>
                        {
                            profileData?.following.length > 0 ? (profileData?.following?.length ) : "0"

                        } Followers
                      </div>
                   </div>
              



        </div>

        <div>
            {
                profileData?.posts?.length > 0 ? (
                    profileData?.posts.map((post) => 
                          <PostCard key = {post._id} post = {post} />
                    )
                ) :
                (
                    "There is no Post"
                )
            }
        </div>
    </div>
  )

  {/* slidebean */}
}
