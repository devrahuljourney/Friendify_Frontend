import React from 'react'
import { useSelector } from 'react-redux'
import AllPost from '../components/PostPage/AllPost'

export default function Post() {
    const {dark} = useSelector((state) => state.profile)
  return (
    <div className={` ${dark ? "dark" : "bg-[#e7eaf6]" } h-screen  px-9 `} >
        <AllPost/>
    </div>
  )
}
