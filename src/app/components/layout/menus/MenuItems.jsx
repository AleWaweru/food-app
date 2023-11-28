import React from 'react'

const MenuItems = () => {
  return (
    <div>
         <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
          <img className="w-[60%] h-[50%] block mx-auto" src="/pizza.png" alt="chips" />
          <h4 className="font-semibold my-2">Chips Masala</h4>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi porro
            fugit eveniet facere quibusdam, quasi suscipit quis sequi aliquam
            modi!
          </p>
          <button className="bg-primary text-white rounded-full px-6 py-2">
            Add to Cart $12
          </button>
        </div>
    </div>
  )
}

export default MenuItems;