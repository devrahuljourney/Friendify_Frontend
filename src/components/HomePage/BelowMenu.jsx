import React from 'react'
import { useSelector } from 'react-redux'

export default function BelowMenu() {

    const {dark} = useSelector((state) => state.profile)
  return (
    <div className={` ${dark ? "dark" : " light " } p-7 h-screen md:inline-block hidden md:w-[100%] ` }  >
        <div className={`  ${dark ? "dark-card" : " light-card " }  rounded-xl  flex flex-col md:justify-start   md:item-start gap-5 font-bold md:w-[100%] w-[70%]   z-20  p-9  `} >
            Below Menu 
        </div>
    </div>
  )
}
