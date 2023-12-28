"use client";
import AddressInputs from "@/app/components/layout/AddressInputs";
import { CartContext, cartProductPrice } from "@/app/components/layout/appContext";
import SectionMenu from "@/app/components/layout/menus/SectionMenu";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CartProduct from "@/app/components/layout/CartProduct";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const[loadingOrders, setLoadingOrders] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrders(true);
      fetch("/api/orders?_id="+id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrders(false);
        });
      })
    }
  }, []);

  let subtotal = 0;

  if(order?.cartProducts){
    for(const product of order?.cartProducts){
        subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center">
        <SectionMenu mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be onthe way</p>
        </div>

        {loadingOrders && (
          <div>Loading order...</div>
        )}

        {order && (
          <div className="grid grid-cols-2 gap-16">
            <div>
                {order.cartProducts.map(product => (
                    <CartProduct product={product}/>
                ))}
                <div className="text-right py-2 text-gray-500">
                    Subtotal:
                    <span className="text-black font-bold inline-block w-8 ml-2">${subtotal}</span><br/>
                    Delivery:
                    <span className="text-black font-bold inline-block w-8 ml-2">$5</span><br/>
                    Total:
                    <span className="text-black font-bold inline-block w-8 ml-2">${subtotal + 5}</span>

                </div>
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <AddressInputs disabled ={true} addressProps={order} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
