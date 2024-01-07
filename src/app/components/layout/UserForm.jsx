"use client";

import { useState } from "react";
import EditableImage from "@/app/components/layout/EditableImage";
import { useProfile } from "./Useprofile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [postal, setPostal] = useState(user?.postal || "");
  const [address, setAddress] = useState(user?.address || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if(propName === 'phone') setPhone(value);
    if(propName === 'address') setAddress(value);
    if(propName === 'postal') setPostal(value);
    if(propName === 'city') setCity(value);
    if(propName === 'country') setCountry(value);
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className=" p-2 rounded-lg relative ">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            address,
            city,
            admin,
            country,
            postal,
          })
        }
        className="grow"
      >
        <label>First and LastName</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="First and LastName"
        />
        <label>Email</label>
        <input type="email" disabled="true" value={user.email} />

        <AddressInputs addressProps={{
          phone, address, city, postal, country
        }}
        setAddressProps={handleAddressChange}
         />

        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 item-center gap-2 mb-2 inline-flex"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />

              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
