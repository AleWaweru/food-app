import { useEffect, useState } from "react";
import EditableImage from "../layout/EditableImage";
import MenuItemPriceProp from "@/app/components/layout/MenuItemPriceProp";

export default function MenuItemForm({ onSubmit, menuItems }) {
  const [image, setImage] = useState(menuItems?.image || "");
  const [name, setName] = useState(menuItems?.name || "");
  const [description, setDescription] = useState(menuItems?.description || "");
  const [price, setPrice] = useState(menuItems?.price || "");
  const [sizes, setSizes] = useState(menuItems?.sizes || []);
  const [category, setCategory] = useState(menuItems?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItems?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

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
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div className="md:grid gap-2 items-start"
      style={{gridTemplateColumns:'.3fr .7fr'}}
      >
        <div className="max-w-[200px]">
        <EditableImage link={image} setLink={setImage} />
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
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

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
