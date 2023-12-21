import Plus from "./icons/Plus";
import Trash from "./icons/trash";
import ArrowDown from "./icons/arrowDown";
import ArrowUp from "./icons/arrowUp";
import { useState } from "react";

function MenuItemPriceProp({ name, ItemSize, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);
  function addProp() {
    setProps((oldProp) => {
      return [...oldProp, { name: "", price: 0 }];
    });
  }

  function editProp(e, index, prop) {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1  border-0 justify-start"
        type="button"
      >
        {isOpen && <ArrowUp />}
        {!isOpen && <ArrowDown />}

        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>name</label>
                <input
                  type="text"
                  placeholder="size name"
                  value={size.name}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-4 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          {ItemSize}
        </button>
      </div>
    </div>
  );
}

export default MenuItemPriceProp;
