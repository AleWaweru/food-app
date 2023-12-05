"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user.name || "" );

  const { status } = session;

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;

  async function handleProfileNameSubmit (e) {
    e.preventDefault();
    await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({name:userName})

    })

  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 items-center ">
          <div>
            <div className=" p-2 rounded-lg relative ">
              <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={80} height={80} alt={"avatar"} />
              <button type="button">Edit</button>
            </div>
          </div>
          <form onSubmit={handleProfileNameSubmit} className="grow">
            <input value={userName} onChange={e => setUserName(e.target.value)} type="text" placeholder="First and LastName" />
            <input type="email" disabled ="true" value={session.data.user.email} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
