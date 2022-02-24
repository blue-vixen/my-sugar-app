import React, { useEffect, useState } from 'react'
import { FormInput } from './FormInput'
import { CustomButton } from './CustomButton'
import { auth, signInWithGoogle } from '../firebase/firebase.utils'

export const SigninCmp = () => {
    const [userCred, setUserCred] = useState({ email: '', password: '' })

    const handleChange = event => {
        const { value, name } = event.target
        setUserCred({ ...userCred, [name]: value })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const { email, password } = userCred
        try {
            await auth.signInWithEmailAndPassword(email, password)
            setUserCred({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email' value={userCred.email} handleChange={handleChange} label='email' required />
                <FormInput name='password' type='password' value={userCred.password} handleChange={handleChange} label='password' required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} type="button" isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}
