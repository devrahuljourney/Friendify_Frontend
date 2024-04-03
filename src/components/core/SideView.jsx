import React from 'react'
import { useSelector } from 'react-redux'
import ProfileCard from '../ProfilePage/ProfileCard'
import FollowerSuggestion from '../ProfilePage/FollowerSuggestion'

export default function SideView() {

    const {dark} = useSelector((state) => state.profile)
  return (
    <div className={` ${dark ? "dark" : "bg-[#E5F0FE] "} h-screen w-[400px] `} >
      <div>
        <ProfileCard/>
        <FollowerSuggestion/>
      </div>
    </div>
  )
}
