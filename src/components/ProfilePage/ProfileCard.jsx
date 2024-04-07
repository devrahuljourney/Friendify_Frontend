import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import coverImg from "../../assets/cover.png";
import { fetchProfile } from '../../services/operations/profileAPI';
import { Link } from 'react-router-dom';

export default function ProfileCard() {
    const { dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);


    const [profileData, setProfileData] = useState(null); 

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log("Token fromm profile ", token)
                const data = await fetchProfile(token);
                setProfileData(data); 
                console.log("Profile Data",data)
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData(); 
    }, [token]); 

    return (
        <div className={` ${dark ? "dark" : " bg-[#E5F0FE] " } p-7 mt-9  `}>
            <div className={`  ${dark ? "dark-card" : " light-card " }   rounded-xl  flex flex-col md:justify-center   md:item-center gap-5 font-bold md:w-[320px] w-[70%]   z-20    `}>
            <div className='' >
                <img src={coverImg} alt='coverimg' />
            </div>
            {profileData && (
                <div className='flex w-[100%] flex-col justify-center items-center gap-5  ' >
                    <div className='flex flex-row  ' >
                    <div className='flex flex-col justify-start items-center' >
                        <p> { profileData.followers.length > 0 ? profileData.followers.length : "0"  } </p>
                        <p>Followers</p>
                    </div>
                    <div className='relative w-24 h-24 ' >
                    <img className={` border-4 border-gray-400 w-24 h-24 rounded-3xl object-cover  absolute bottom-[70%]`} src={profileData?.additionalDetails?.image} alt='profileimage' />

                    </div>
                    <div className='flex flex-col justify-start items-center' >
                        <p> { profileData.following.length > 0 ? profileData.following.length : "0"  } </p>
                        <p>Following</p>
                    </div>
                    </div>

                    <div className='flex w-[100%] flex-col justify-center gap-8 -translate-y-11 px-4 items-center' >
                        <div className=' flex w-full flex-col justify-center items-center' >
                            <p className='text-[22px]  ' > {profileData.firstname} {profileData.lastname} </p>
                            <p className='font-semibold flex justify-center items-center text-gray-400  ' > {profileData?.additionalDetails?.bio} </p>
                        </div>

                        <Link className={` font-semibold ${dark ? " dark-highlight  ":" light-highlight"} hover:bg-gray-200 p-3 w-1/2 flex justify-center items-center rounded-xl `} to='/profile' >
                            My Profile
                        </Link>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
