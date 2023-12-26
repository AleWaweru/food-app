"use client";
import Image from "next/image";
import { CartContext, cartProductPrice } from "../components/layout/appContext";
import SectionMenu from "../components/layout/menus/SectionMenu";
import { useContext, useEffect, useState } from "react";
import Trash from "../components/layout/icons/trash";
import AddressInputs from "../components/layout/AddressInputs";
import { useProfile } from "../components/layout/Useprofile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

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

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
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
              <div className="flex items-center gap-4  border-b py-2">
                <div className="w-24">
                  <Image width={240} height={240} src={product.image} alt="" />
                </div>

                <div className="grow">
                  <h3 className="font-semibold"> {product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-800">
                      Size:
                      <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div>
                          Extra {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkoout</h2>
          <form>
            <AddressInputs
               addressProps={address}
               setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
