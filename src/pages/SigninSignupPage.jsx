import React from 'react'
import { SigninCmp } from '../cmps/SigninCmp'
import { SignupCmp } from '../cmps/SignupCmp'

export function SigninSignupPage() {
    return (
        <div className='signin-signup-page'>
            <SigninCmp />
            <SignupCmp />
        </div>
    )
}
