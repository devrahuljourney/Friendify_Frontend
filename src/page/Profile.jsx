import React from 'react'
import { useParams } from 'react-router-dom'
import ProfilePage from '../components/ProfilePage/ProfilePage';

export default function Profile() {

  const {userId} = useParams();
  return (
    <div>
      <ProfilePage userId = {userId} />
    </div>
  )
}
