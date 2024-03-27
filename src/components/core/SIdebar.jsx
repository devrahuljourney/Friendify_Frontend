import React, { useEffect, useState } from 'react';
import { sidebarLinks } from '../../data/sidebarLinks';
import SidebarLink from './SidebarLink';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../common/ConfirmationModal';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { setDark } from '../../slices/profileSlice';

export default function SIdebar() {
    const { dark } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isDark, setIsDark] = useState(dark);

    const darkModeHandler = () => {
        dispatch(setDark(!isDark));
        setIsDark(!isDark); 
        localStorage.setItem('dark', !isDark);
    };

    useEffect(() => {
        const darkModePreference = localStorage.getItem('dark');
        if (darkModePreference !== null) {
            setIsDark(darkModePreference === 'true');
        }
    }, []);

    return (
        <div className={` ${dark ? "dark" : " bg-[#dbd8e3] " } md:p-8 p-2 h-screen flex flex-col justify-start item-start gap-5 font-bold  `} >
            <div className="flex justify-center items-start flex-col gap-5   gap-x-2">
                {sidebarLinks.map((link) => (
                    <SidebarLink key={link.id} link={link} iconName={link.icon} />
                ))}
            </div>

            <button className="flex items-center gap-x-2" onClick={darkModeHandler}>
                {isDark ? (
                    <div className="flex items-center gap-x-2">
                        <MdDarkMode className="text-2xl  "/>
                        <p className='hidden md:inline-block'>Dark</p> {/* Hide on small screens */}
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <CiLight className="text-2xl  "/>
                        <p className='hidden md:inline-block'>Light</p> {/* Hide on small screens */}
                    </div>
                )}
            </button>

            <button
                onClick={() =>
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn2Handler: () => setConfirmationModal(null),
                    })
                }
                className="text-sm font-medium text-richblack-300"
            >
                <div className="flex items-center gap-x-2">
                    <VscSignOut className="text-2xl  " />
                    <span className='hidden md:inline-block font-bold'>Logout</span> 
                </div>
            </button>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}
