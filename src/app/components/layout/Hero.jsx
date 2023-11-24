import Image from "next/image";

function Hero() {
  return (
    <section className="grid grid-cols-2">
        <div>
      <h1 className="text-4xl font-semibold">Everything is Better with Pizza</h1>
      <p className="my-4 text-gray-500">
        Pizza is a missing piece that makes every day completes, a simple yet
        delicious joy in life{" "}
      </p>
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
