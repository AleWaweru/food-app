"use client";
import { useEffect, useState } from "react";
import SectionMenu from "../components/layout/menus/SectionMenu";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/layout/Useprofile";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={profile.admin} />
      <div className="text-center">
        <SectionMenu mainHeader={"Orders"} />
      </div>
      {orders?.length > 0 &&
        orders.map((order) => <div key={order._id}>{order.createdAt}</div>)}
    </section>
  );
}
