import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/SIdebar'
import SideView from '../components/core/SideView'
import { useSelector } from 'react-redux'

export default function Home() {

  const {dark} = useSelector((state) => state.profile)
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)]  ">
      <Sidebar />
      <div  className={` ${dark ? "dark" : "bg-[#e7eaf6]" } h-screen sc overflow-auto border-r-2 border-gray-400 `}>
        <div className=" h-screen  ">
          <Outlet />
        </div>
      </div>

      <div className='md:inline-block hidden' ><SideView/></div>
    </div>
  )
}
