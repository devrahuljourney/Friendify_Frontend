import React from 'react'
import { useSelector } from 'react-redux'

export default function SideView() {

    const {dark} = useSelector((state) => state.profile)
  return (
    <div className={` ${dark ? "dark" : "bg-[#E5F0FE] "} h-screen w-[400px] `} >SideView</div>
  )
}
