"use client"
import React from 'react'
import { useState } from 'react';
import Image from "next/image";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  async function handleFormSubmit (e) {
    e.preventDefault();
    setCreatingUser(true)
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-type': 'application/json'},
    })

    setCreatingUser(false);

  }
  return (
    <section>
        <h1 className='text-center text-primary text-4xl'>Register</h1>
        <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
            <input  disabled={creatingUser}  type='email' placeholder='email' value={email} 
            onChange={e =>setEmail( e.target.value)}></input>
            <input disabled={creatingUser} type='password' placeholder='password' value={password}
            onChange={e => setPassword(e.target.value)}></input>
            <button  disabled={creatingUser}  type='submit'>Register</button>
            <div className='my-4 text-center text-gray-500'>
                or login with provider
            </div>
            <button className='flex gap-4 justify-center'>
                <Image src={"/google.png"} alt={"login with google account"} width={25}
            height={25}/>
                Login with google
                </button>
        </form>
    </section>
  )
}

export default RegisterPage;