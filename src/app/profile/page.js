"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserTabs from "../components/layout/UserTabs";
import EditableImage from "@/app/components/layout/EditableImage"

// Component Definition
const ProfilePage = () => {
  // State Variables
  const session = useSession();
  console.log({ session });
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isadmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  // Effect Hook to Update User Data on Authentication
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setAddress(data.address);
          setPostal(data.postal);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  //Handling Profile
  async function handleProfileNameSubmit(e) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: userName,
            image,
            phone,
            city,
            address,
            postal,
            country,
          }),
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
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-2">
          <div>
            <div className=" p-2 rounded-lg relative ">
           <EditableImage link={image} setlink={setImage}/>
            </div>
          </div>
          <form onSubmit={handleProfileNameSubmit} className="grow">
            <label>First and LastName</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="First and LastName"
            />
            <label>Email</label>
            <input
              type="email"
              disabled="true"
              value={session.data.user.email}
            />

            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <div className="flex gap-2">
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>

              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
