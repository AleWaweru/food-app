import React, { useContext, useState } from "react";
import FlyingButton from "react-flying-item";
import { CartContext } from "../appContext";
import toast from "react-hot-toast";
import MenuItemBox from "./menuItemBox";
import Image from "next/image";

const MenuItems = (menuItem) => {
  const { image, name, description, price, sizes, extraIngredientPrices } =
    menuItem;
  const { addCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addCart(menuItem, selectedSize, selectedExtras);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    toast.success("Added to cart!", {
      position: "top-right",
    });
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = price;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label className="flex items-center gap-2 p-3 border rounded-md mb-1">
                      <input
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />
                      {size.name} ${price + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any Extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label className="flex items-center gap-2 p-3 border rounded-md mb-1">
                      <input
                        onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                        type="checkbox"
                        name={extraThing.name}
                      />
                      {extraThing.name}+ ${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                <div
                  onClick={handleAddToCartButtonClick}
                  className="flying-button-parent mt-4 sticky bottom-2"
                >
                  Add to cart (KSH {selectedPrice})
                </div>
              </FlyingButton>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemBox onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItems;
