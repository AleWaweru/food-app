import { useState } from "react";
import EditableImage from "../layout/EditableImage";
import MenuItemPriceProp from "@/app/components/layout/MenuItemPriceProp";

export default function MenuItemForm({ onSubmit, menuItems }) {
  const [image, setImage] = useState(menuItems?.image || "");
  const [name, setName] = useState(menuItems?.name || "");
  const [description, setDescription] = useState(menuItems?.description || "");
  const [price, setPrice] = useState(menuItems?.price || "");
  const [sizes, setSizes] = useState(menuItems?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItems?.extraIngredientPrices || []
  );

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          price,
          sizes,
          extraIngredientPrices,
        })
      }
      className="mt-8 max-w-md mx-auto"
    >
      <div className="flex gap-2 items-start">
        <div className="max-w-[200px]">
          <EditableImage link={image} setlink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <label>Base Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
          />

          <MenuItemPriceProp
            name={"Sizes"}
            ItemSize={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProp
            name={"Extra ingredients"}
            ItemSize={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
