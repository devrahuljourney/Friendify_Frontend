import React, { useState } from 'react'
import { sidebarLinks } from '../../data/sidebarLinks'
import SidebarLink from './SidebarLink'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../common/ConfirmationModal';


export default function SIdebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null)
  return (
    <div>
        {
            sidebarLinks.map((link) => {
                return <SidebarLink key ={link.id} link={link} iconName={link.icon} />
            })
        }

        <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                // btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>

          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
