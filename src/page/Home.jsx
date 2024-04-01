import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/SIdebar'
import SideView from '../components/core/SideView'
import { useSelector } from 'react-redux'
import BelowMenu from '../components/HomePage/BelowMenu'

export default function Home() {

  const {dark} = useSelector((state) => state.profile)
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)]  ">
      <div className='flex flex-col ' >
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
