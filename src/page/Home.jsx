import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/SIdebar'
import SideView from '../components/core/SideView'
import { useSelector } from 'react-redux'
import BelowMenu from '../components/HomePage/BelowMenu'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useState } from 'react'
export default function Home() {

  const {dark} = useSelector((state) => state.profile);
  const [menu, setMenu] = useState(false);
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)]  ">
      <div onClick={() => setMenu(!menu)} className='md:hidden  absolute right-4 top-2 z-50 text-3xl  ' >
         {
          menu ? ( <GrClose/> ) : ( <GiHamburgerMenu/>)
         }
      </div>
      <div className={ ` md:flex md:flex-col md:relative absolute w-full top-10 h-full transition-all transition-200 ${menu ? " right-0" : " right-[-500px] "} ` } >
        <Sidebar/>
        <BelowMenu/>
      </div>
      <div  className={` ${dark ? "dark" : "light" }  sc overflow-auto  `}>
        <div className=" h-screen  ">
          <Outlet />
        </div>
      </div>

      <div className='md:inline-block hidden' ><SideView/></div>
    </div>
  )
}
