import Image from "next/image";
import Right from "./icons/arrowRight";

function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Life<br/>is Better <br/> with a <br/>Hot Delicious <br/>  <span className="text-primary">MEAL</span>
        </h1>
        <p className="my-4 text-gray-500">
          A meal is a missing piece that makes every day complete, a simple yet
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
      <div className="relative hidden md:block">
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
