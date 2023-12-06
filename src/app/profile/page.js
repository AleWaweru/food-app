"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user.name || "");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { status } = session;

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;

  async function handleProfileNameSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });
    setSaved(true);
    setIsSaving(false);
  }

  function handleProfileImage (e) {
    const files = e.target.files;
    if(files?.length === 1){
      const data = new FormData;
      data.set('file', files[0]);
      fetch('/api/upload', {
        method:'POST',
        body: data,
      });
    }

  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h1 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
            Profile saved!
          </h1>
        )}
         {isSaving && (
          <h1 className="text-center bg-blue-100 p-4 rounded-lg border border-green-300">
            Saving...
          </h1>
        )}
        <div className="flex gap-2 items-center ">
          <div>
            <div className=" p-2 rounded-lg relative ">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={80}
                height={80}
                alt={"avatar"}
              />
              <label >
                <input className="hidden" type="file" onChange={handleProfileImage}/>
                <span className="block border border-gray-300 rounded-lg p-2 cursor-pointer">Edit</span>
              </label>
            </div>
          </div>
          <form onSubmit={handleProfileNameSubmit} className="grow">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="First and LastName"
            />
            <input
              type="email"
              disabled="true"
              value={session.data.user.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
