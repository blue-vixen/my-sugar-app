import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormInput } from './FormInput'
import { CustomButton } from './CustomButton'
import { auth, createUserProfileDocument } from '../firebase/firebase.utils'


export const SignupCmp = () => {
    const [userCred, setUserCred] = useState({ displayName: '', email: '', password: '', confirmPassword: '' })
    const { displayName, email, password, confirmPassword } = userCred


    const handleChange = event => {
        const { name, value } = event.target
        setUserCred({ ...userCred, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords don\'t match')
            return
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })
            setUserCred({ displayName: '', email: '', password: '', confirmPassword: '' })

        } catch (error) {
            console.error(error)
        }

    }


    return <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='signup-form' onSubmit={handleSubmit}>
            <FormInput type='text' name='displayName' value={displayName} onChange={handleChange} label='Display Name' required />
            <FormInput name='email' type='email' value={email} handleChange={handleChange} label='email' required />
            <FormInput name='password' type='password' value={password} handleChange={handleChange} label='password' required />
            <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} label='Confirm Password' required />
            <CustomButton type='submit'>Sign up</CustomButton>
        </form>
    </div>
}