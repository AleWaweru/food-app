"use client";
import { useEffect, useState } from "react";
import MenuItems from "../components/layout/menus/MenuItems";
import SectionMenu from "@/app/components/layout/menus/SectionMenu";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() =>{
        fetch('api/categories').then(response =>{
            response.json().then(categories => setCategories(categories))
        });

        fetch('api/menu-items').then(response =>{
            response.json().then(menuItems => setMenuItems(menuItems))
        })

    }, []);

    return(
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}> 
                    <div className="text-center">
                        <SectionMenu mainHeader={c.name}/>
                    </div>
                    <div  className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                    {menuItems.filter(item => item.category === c._id).map(item => (
                        <MenuItems key={item._id} {...item}/>
                    ))}

                    </div>
                </div>
            ))}

        </section>
    );
}