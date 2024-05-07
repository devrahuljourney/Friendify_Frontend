import React from 'react'
import img from '../../assets/undraw_social_influencer_re_beim.svg'
import Logo from './Logo'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useSelector } from 'react-redux'

export default function Template({ formtype }) {

  const {dark } = useSelector((state) => state.profile)
  return (
    <div className= {` ${dark ? "dark" : "light"} w-[100%] flex flex-col`}>
      <Logo />
      <div className='flex md:flex-row flex-col-reverse justify-between items-center'>
        <div className='p-4 md:w-[50%] '>
          <img src={img} alt='authImage' />
        </div>
        <div className=' w-[50%] flex justify-center items-center ' >
          {formtype === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  )
}
