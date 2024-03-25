import React from 'react'
import img from '../../assets/undraw_social_influencer_re_beim.svg'
import Logo from './Logo'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Template({ formtype }) {
  return (
    <div className='bg-[#dbd8e3] w-[100%] flex flex-col'>
      <Logo />
      <div className='flex flex-row justify-between items-center'>
        <div className='p-4 w-[50%] '>
          <img src={img} alt='authImage' />
        </div>
        <div className=' w-[50%] flex justify-center items-center ' >
          {formtype === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  )
}
