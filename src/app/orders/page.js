"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/layout/Useprofile";
import dbTimeForHuman from "@/app/lib/dateTime";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(orders => {
        console.log(orders);
        setOrders(orders.reverse());
      });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={profile.admin} />

      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map(order => (
            <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-3">
              <div className="text-gray-500">
                {order.userEmail}
                </div>
              <div className="text-center">
                <span
                  className={
                    (order.paid ? 'bg-green-500 ' : 'bg-red-500 ')
                    + 'p-2 rounded-md text-white'
                  }
                >
                  {order.paid ? 'Paid' : 'Not paid'}
                </span>
              </div>
              <div className="text-right">{dbTimeForHuman(order.createdAt)}</div>
            </div>
          ))}
      </div>
    </section>
  );
}
