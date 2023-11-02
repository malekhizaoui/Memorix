import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './auth.css'
function AuthUser({setIsLoggedIn}) {
  return (
    <div className="main">
      <div className='auth-container'>
      <input type="checkbox" id="chk" aria-hidden="true" />
      <SignUp setIsLoggedIn={setIsLoggedIn}/>
      
      <SignIn setIsLoggedIn={setIsLoggedIn}/>
    </div>
    </div>
  )
}

export default AuthUser