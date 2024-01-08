"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuItems from "./menus/MenuItems";
import SectionMenu from "./menus/SectionMenu";

function HomeMenu() {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(response => {
      response.json().then(menuItems => {
        const bestSellers = menuItems.slice(-3);
        setBestSeller(bestSellers);

      })
    })
  })
  return (
    <section className="mt-4">
      <div className="absolute left-0 right-0 mt-5">
        <div className="h-48 w-48 absolute left-0 -z-10 overflow-clip">
          <Image src={"/sallad1.png"} width={120} height={120} alt={"pizza"} sizes="100px" />
        </div>
        <div className="h-35 w-44 absolute right-0 -z-14 ml-[-200px] overflow-hidden background-hidden">
          <Image
            className="ml-[90px] overflow-hidden"
            src={"/sallad2.png"}
            width={100}
            height={195}
            alt={"pizza"}
            sizes="100px"
          />
        </div>
      </div>
      <div className="text-center">
       <SectionMenu
       subHeader={'Check Out'}
       mainHeader={'Most Rated Meals'}
       />
      </div>
      <div className="grid sm:grid-cols-3 gap-4 ">
      {bestSeller?.length > 0 && bestSeller.map(
        item => (
          <MenuItems key={item._id} {...item}/>
        )
      )}
      </div>
    </section>
  );
}

export default HomeMenu;
