"use client";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/layout/Useprofile";

export default function Categories() {
  const { loading: profileLoading, data: profileData } = useProfile();

  // Loading state
  if (profileLoading) {
    return "Loading user info...";
  }

  // Not an admin
  if (!profileData.admin) {
    return "Not an Admin";
  }

  // Admin view
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isadmin={true} />
      Categories
    </section>
  );
}
