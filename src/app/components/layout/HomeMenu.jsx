import React from "react";
import Image from "next/image";
import MenuItems from "./menus/MenuItems";
import SectionMenu from "./menus/SectionMenu";

function HomeMenu() {
  return (
    <section className="">
      <div className="absolute left-0 right-0">
        <div className="h-48 w-48 absolute left-0 -z-10">
          <Image src={"/sallad1.png"} width={120} height={120} alt={"pizza"} />
        </div>
        <div className="h-30 w-48 absolute right-0 -z-14 ml-[-200px]">
          <Image
            className="ml-[90px]"
            src={"/sallad2.png"}
            width={100}
            height={195}
            alt={"pizza"}
          />
        </div>
      </div>
      <div className="text-center">
       <SectionMenu
       subHeader={'check out'}
       mainHeader={'Menu'}
       />
      </div>
      <div className="grid grid-cols-3 gap-4 m-4">
       <MenuItems/>
       <MenuItems/>
       <MenuItems/>
       <MenuItems/>
       <MenuItems/>
       <MenuItems/>
      </div>
    </section>
  );
}

export default HomeMenu;
