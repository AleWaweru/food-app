"use client";

import { useState } from "react";
import EditableImage from "@/app/components/layout/EditableImage";

export default function UserForm({user, onSave}) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [postal, setPostal] = useState(user?.postal || '');
  const [address, setAddress] = useState(user?.address || '');
  const [country, setCountry] = useState(user?.country || '');
  return (
    <div className="flex gap-2">
      <div>
        <div className=" p-2 rounded-lg relative ">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form onSubmit={e => onSave(e, {
        name:userName, image, phone, address, city, country, postal, 

      })} 
      className="grow">
        <label>First and LastName</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="First and LastName"
        />
        <label>Email</label>
        <input type="email" disabled="true" value={user.email} />

        <label>Phone</label>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <div className="flex gap-14">
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
