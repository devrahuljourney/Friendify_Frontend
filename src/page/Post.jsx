import React from 'react'
import { useSelector } from 'react-redux'
import AllPost from '../components/PostPage/AllPost'
// import UploadPost from "../components/PostPage/UploadPost"
export default function Post() {
    const {dark} = useSelector((state) => state.profile)
  return (
    <div className={` ${dark ? "dark" : "light" } h-screen  md:px-9 `} >
        {/* <UploadPost/> */}
        <AllPost/>
    </div>
  )
}
