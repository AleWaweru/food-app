"use client";
import { useState } from "react";
import Image from "next/image";
import {signIn} from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
   
    await signIn('credentials', {email, password, callbackUrl: '/'});

    setLoginInProgress(false);
  }

  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl">Login</h1>

        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            disabled={loginInProgress}
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            disabled={loginInProgress}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button disabled={loginInProgress} type="submit">Login</button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button type="button" onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center">
            <Image
              src={"/google.png"}
              alt={"login with google account"}
              width={25}
              height={25}
            />
            Login with google
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
