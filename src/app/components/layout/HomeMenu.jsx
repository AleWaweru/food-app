import React from "react";
import Image from "next/image";

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
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          Check out
        </h3>
        <h2 className="text-primary font-semibold italic text-4xl">Menu</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 m-4">
        <div className="bg-gray-300 p-4 rounded-lg text-center">
          <img src="" alt="chips" />
          <h4>Chips Masala</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi porro
            fugit eveniet facere quibusdam, quasi suscipit quis sequi aliquam
            modi!
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomeMenu;
