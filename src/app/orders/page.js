"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/layout/Useprofile";
import { dbTimeForHuman } from "@/app/lib/dateTime";
import Link from "next/link";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();
  const[loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders")
      .then(res =>{ res.json()
      .then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
      })
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div>Loading orders...</div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 flex flex-col md:flex-row mb-2 items-center p-4 rounded-lg gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-4">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500 " : "bg-red-500 ") +
                      "p-1 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500 text-sm">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap ">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
