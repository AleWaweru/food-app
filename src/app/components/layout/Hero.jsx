import Image from "next/image";
import Right from "./icons/arrowRight";

function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-10">
        <h1 className="text-4xl font-semibold">
          Everything <br/>is Better <br/> with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500">
          Pizza is a missing piece that makes every day completes, a simple yet
          delicious joy in life{" "}
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary justify-center text-white px-5 py-2 uppercase rounded-full flex gap-4 items-center">
            Order Now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
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
