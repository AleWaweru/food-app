"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserTabs from "../components/layout/UserTabs";
import UserForm from "@/app/components/layout/UserForm";

// Component Definition
const ProfilePage = () => {
  // State Variables
  const session = useSession();
  const [isadmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [user, setUser] = useState(false);
  const { status } = session;

  // Effect Hook to Update User Data on Authentication
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then(response => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  //Handling Profile
  async function handleProfileNameSubmit(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          const errorDetails = await response.json();
          reject(errorDetails);
        }
      } catch (error) {
        reject({ message: "An unexpected error occurred.", error });
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: (errorDetails) => {
        // Handle the error message based on errorDetails
        console.error("Error saving profile:", errorDetails);
        return "Profile save failed.";
      },
    });
  }

  // Event Handler for Profile Image Upload
  

  // Render
  if (status === "loading" || !profileFetched) {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isadmin={isadmin}/>
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileNameSubmit}/>
       
      </div>
    </section>
  );
};

export default ProfilePage;
