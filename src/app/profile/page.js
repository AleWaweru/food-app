"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

// Component Definition
const ProfilePage = () => {
  // State Variables
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Session Hook
  const session = useSession();
  const { status } = session;

  // Effect Hook to Update User Data on Authentication
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  // Event Handler for Profile Name Submission
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

  // Event Handler for Profile Image Upload
  async function handleProfileImage(e) {
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const link = await response.json();
      console.log(link);
      setImage(link);
    }
  }

  // Render
  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
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
              {image && (
                <Image
                  className="rounded-lg w-full h-full mb-1"
                  src={image}
                  width={80}
                  height={80}
                  alt={"avatar"}
                />
              )}

              <label>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleProfileImage}
                />
                <span className="block border border-gray-300 rounded-lg p-2 cursor-pointer">
                  Edit
                </span>
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

// Export Component
export default ProfilePage;
