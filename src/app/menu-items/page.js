"use client";
import { useProfile } from "../components/layout/Useprofile";
import UserTabs from "../components/layout/UserTabs";
import Link from "next/link";
import Right from "@/app/components/layout/icons/arrowRight";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isadmin={true} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          Create new Item
          <Right />
        </Link>
        <div>
          <h2 className="text-sm text-gray-500 mt-4">Edit Menu Items</h2>
          <div className="grid grid-cols-4 gap-2">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  key={item._id}
                  href={"/menu-items/edit/" + item._id}
                  className="bg-gray-200 rounded-lg p-4"
                >
                  <div className="relative">
                    <Image
                      className="rounded-md"
                      src={item.image}
                      alt={"image"}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
