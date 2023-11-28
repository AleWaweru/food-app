import React from 'react'
import Image from "next/image";

const RegisterPage = () => {
  return (
    <section>
        <h1 className='text-center text-primary text-4xl'>Register</h1>
        <form className='block max-w-xs mx-auto'>
            <input type='email' placeholder='email'></input>
            <input type='password' placeholder='password'></input>
            <button type='submit'>Register</button>
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