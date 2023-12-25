import React, { useContext } from "react";
import { CartContext } from "../appContext";

const MenuItems = (menuItem) => {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    menuItem;
  const { addCart } = useContext(CartContext);

  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <img
          className="w-full object-cover h-auto rounded-md mx-auto"
          src={image}
          alt="chips"
        />
        <h4 className="font-semibold my-2">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          onClick={() => addCart(menuItem)}
          className="bg-primary text-white rounded-full px-6 py-2"
        >
          Add to Cart ${price}
        </button>
      </div>
    </div>
  );
};

export default MenuItems;
