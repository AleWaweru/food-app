"use client";
import { useParams } from "next/navigation";
import { useProfile } from "../../components/layout/Useprofile";
import UserForm from "../../components/layout/UserForm";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleUserForm(e, data) {
    e.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(promise, {
        loading:'User info saving...',
        success: "User info Saved.",
        Error: "An error Occured while saving ",
    })
  }

  if (loading) {
    return "loading user info...";
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isadmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleUserForm} />
      </div>
    </section>
  );
}
