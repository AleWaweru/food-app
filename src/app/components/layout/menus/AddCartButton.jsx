import FlyingButton from "react-flying-item";

export default function AddCartButton({
  hasSizesOrExtras,
  onClick,
  price,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton 
        targetTop={"5%"} 
        targetLeft={"95%"} 
        src={image}>
          <div onClick={onClick} >
          Add to Cart ${price}
          </div>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white rounded-full px-6 py-2"
    >
      <span>Add to Cart (from ${price})</span>
    </button>
  );
}
