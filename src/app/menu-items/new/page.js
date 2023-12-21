"use client";
import Left from "@/app/components/layout/icons/arrowLeft";
import { useProfile } from "@/app/components/layout/Useprofile";
import toast from "react-hot-toast";
import UserTabs from "@/app/components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
import { useState } from "react";
import Link from "next/link";
import { redirect } from 'next/navigation';
import MenuItemForm from "@/app/components/layout/MenuItemForm";

export default function NewMenuItemPage() {

  const [redirectToMenuList, setRedirectToMenuList] = useState(false);

  const { loading, data } = useProfile();

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this yammy item",
      success: "Saved",
      Error: "Error Occured",
    });

    setRedirectToMenuList(true);
  }

  if(redirectToMenuList){
    return redirect('/menu-items')
  }

  if (loading) {
    return "Loading user info...";
  }

  //   if (!data.admin) {
  //     return "Not an admin.";
  //   }

  return (
    <section className="mt-8">
      <UserTabs isadmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItems={null} onSubmit={handleFormSubmit}/>
    </section>
  );
}
