import React from 'react'
import logo from "../../assets/friendify-high-resolution-logo-transparent.png"
export default function Logo() {
  return (
    <div className=' bg-[#f1eded] flex justify-center items-center h-[80px]  ' >
        <img className=' w-[100px] md:w-[200px] ' src={logo} alt='app-logo' />
    </div>
  )
}
