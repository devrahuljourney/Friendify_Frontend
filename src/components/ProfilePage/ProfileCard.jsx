import React from 'react'
import { useSelector } from 'react-redux'

export default function ProfileCard() {
    const {token} = useSelector((state) => state.profile)
  return (
    <div>ProfileCard</div>
  )
}
