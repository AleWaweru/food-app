import AddCartButton from "./AddCartButton";

export default function MenuItemBox ({onAddToCart, ...item}){
  const {image, description, name, price, sizes, extraIngredientPrices,} = item;

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;  
  return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <img
          className="w-full object-cover h-auto rounded-md mx-auto"
          src={image}
          alt="chips"
        />
        <h4 className="font-semibold my-2">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      < AddCartButton hasSizesOrExtras={hasSizesOrExtras}
      image={image}
      onClick={onAddToCart}
      price={price}
      />
      </div>
    );
};