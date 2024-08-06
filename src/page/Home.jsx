import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/SIdebar'
import SideView from '../components/core/SideView'
import { useDispatch, useSelector } from 'react-redux'
import BelowMenu from '../components/HomePage/BelowMenu'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

import {setMenu} from ".././slices/profileSlice"
export default function Home() {

  const {dark,menu} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)]  ">
      <div onClick={() => dispatch(setMenu(!menu))} className='md:hidden cursor-pointer absolute right-4 top-2 z-50 text-3xl  ' >
         {
          menu ? ( <GrClose/> ) : ( <GiHamburgerMenu/>)
         }
      </div>
      <div className={ ` md:flex md:flex-col md:relative absolute md:w-[25%] w-full top-10 h-full transition-all transition-200 ${menu ? " right-0" : " md:right-0 right-[-700px] "}  ` } >
        <Sidebar/>
        <BelowMenu/>
      </div>
      <div  className={` ${dark ? "dark" : "light" } md:w-[50%] w-full  sc overflow-auto  `}>
        <div className=" h-screen  ">
          <Outlet />
        </div>
      </div>

      <div className='lg:inline-block hidden lg:w-[25%]' ><SideView/></div>
    </div>
  )
}
