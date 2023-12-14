"use client"
import UserTabs from "../components/layout/UserTabs";
import {useProfile} from "@/app/components/layout/Useprofile";
import EditableImage from "../components/layout/EditableImage";
import { useState } from "react";

export default function MenuItems () {
    const {loading, data} = useProfile();
    const [image, setImage] = useState();

    if(loading){
        return 'Loading user info'
    }

    if(!data.admin){
        return 'Not an admin.';
    }
    return (
        <section className="mt-8">
            <UserTabs isadmin={true}/>
            <form className="mt-8 max-w-md mx-auto">
                <div className="flex gap-2 items-start">
                    <div>
                        <EditableImage link={image} setlink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text"/>
                        <label>Description</label>
                        <input type="text"/>
                        <label>Base Price</label>
                        <input type="text"/>
                        <button type="submit">Save</button>
                    </div>
                </div>

            </form>

        </section>
    );
}