import Right from "./icons/arrowRight";

function Hero() {
  return (
    <section className="hero md:mt-4 relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/chicken.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,  // Adjust the opacity value as needed
        }}
      ></div>

      <div className="py-8 md:py-12 relative z-10 px-4">
        <h1 className="text-4xl font-semibold text-gray-700">
          Life<br/>is Better <br/> with a <br/>Hot Delicious <br/>  <span className="text-primary">MEAL</span>
        </h1>
        <p className="my-4 text-gray-800 font-semibold">
          A meal is a missing piece that makes every day complete, a simple yet
          delicious joy in life{" "}
        </p>
        <div className="flex gap-6 text-sm">
          <button className="bg-primary justify-center text-white px-5 py-2 uppercase rounded-full flex gap-4 items-center">
            Order Now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-white font-semibold">
            Learn More
            <Right />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
