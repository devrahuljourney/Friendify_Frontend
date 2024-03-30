import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/SIdebar'
import SideView from '../components/core/SideView'

export default function Home() {
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)]  ">
      <Sidebar />
      <div className="  flex-1 overflow-auto">
        <div className="">
          <Outlet />
        </div>
      </div>

      <div className='md:inline-block hidden' ><SideView/></div>
    </div>
  )
}
