import React from 'react';
import * as Icons from "react-icons/vsc" // Import all Material Design icons
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    // This function seems to have a typo and might cause infinite recursion
    const matchRoute = (route) => {
        return matchRoute({ path: route }, location.pathname);
    };

    return (
        <NavLink to={link.path}>
            <div>
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}
