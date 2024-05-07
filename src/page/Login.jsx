import React from 'react'
import Template from "../components/auth/Template"
import { useSelector } from 'react-redux'
export default function Login() {

  const {dark} = useSelector((state) => state.profile);
  return (
    <div  >
        <Template  formtype = "login" />
    </div>
  )
}
