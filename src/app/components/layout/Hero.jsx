import Image from "next/image";
import Right from "./icons/arrow";

function Hero() {
  return (
    <section className="hero">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br/>is Better <br/> with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500">
          Pizza is a missing piece that makes every day completes, a simple yet
          delicious joy in life{" "}
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary text-white px-7 py-2 uppercase rounded-full flex gap-2 items-center">
            Order Now
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}

export default Hero;
