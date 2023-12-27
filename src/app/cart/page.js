"use client";
import Image from "next/image";
import { CartContext, cartProductPrice } from "../components/layout/appContext";
import SectionMenu from "../components/layout/menus/SectionMenu";
import { useContext, useEffect, useState } from "react";
import Trash from "../components/layout/icons/trash";
import AddressInputs from "../components/layout/AddressInputs";
import { useProfile } from "../components/layout/Useprofile";
import toast from "react-hot-toast";
import CartProduct from "@/app/components/layout/CartProduct"

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  useEffect(() =>{
    if (typeof window !== 'undefined') {
      if(window.location.href.includes('canceled')){
        toast.error('Payment failed 😔')
      }
    }

  }, []);

  useEffect(() => {
    if(profileData?.city){
        const {phone, address, postal, country, city} = profileData;
        const addressFromProfile = {
            phone,
            address,
            city,
            postal,
            country
        };
        setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }

  async function proceedToCheckout(ev){
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async(response) => {

        if(response.ok){
          resolve();
          window.location = await response.json();
        }else{
          reject();
        }
      });

    });
    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      Error: 'Something went wrong... Please try again later',
    })
 
   
  }

  if(cartProducts?.length === 0){
    return(
      <section className="mt-8 text-center">
         <SectionMenu mainHeader={"Cart"} />
         <p className="mt-4">Your Shopping cart is empty 😔</p>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionMenu mainHeader={"Cart"} />
      </div>

      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          products
          {cartProducts === 0 && <div>No products in you shopping Cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
            <CartProduct product= {product} onRemove={removeCartProduct}/>
            ))}
          <div className="py-2 justify-end flex pr-16 items-center">
            <div className="text-gray-500">
              Subtotal:<br/>
              Delivery: <br/>
              Total: 
            </div>
            <div className=" font-semibold pl-2 text-right">
              ${subtotal}<br/>
              $5<br/>
              ${subtotal+5}
              </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
               addressProps={address}
               setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal+5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
