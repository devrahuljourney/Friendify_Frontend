import React from 'react'
import { useParams } from 'react-router-dom'
import ProfilePage from '../components/ProfilePage/ProfilePage';

export default function Profile() {

  const {userId} = useParams();
  return (
    <div className=' w-full md:py-10 md:px-7 ' >
      <ProfilePage userId = {userId} />
    </div>
  )
}
