import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setMenu } from '../../slices/profileSlice';

export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();
    const { dark, user } = useSelector((state) => state.profile);

    const matchRoute = (route) => {
        // Check if the current location pathname matches the route path
        return location.pathname === route;
    };

    const isProfileLink = link.name === 'Profile';

    return (
        <NavLink onClick={() => dispatch(setMenu(false))} to={isProfileLink ? `/profile/${user._id}` : link.path}>
            <div className={`${matchRoute(link.path) || (isProfileLink && location.pathname.startsWith('/profile')) ? (dark ? "dark-highlight" : "light-highlight") : ''} flex justify-center p-2 rounded-xl items-center gap-x-2`}>
                <Icon className="text-2xl" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}
