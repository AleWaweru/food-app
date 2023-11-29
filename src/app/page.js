
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionMenu from "./components/layout/menus/SectionMenu";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionMenu subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="max-w-auto flex flex-col gap-4 text-gray-500 max-w-md mx-auto mt-4 ">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi porro
          fugit eveniet facere quibusdam, quasi suscipit quis sequi aliquam
          modi!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi porro
          fugit eveniet facere quibusdam, quasi suscipit quis sequi aliquam
          modi!
        </p>
        </div>
        <section className="my-8" >
        <SectionMenu  subHeader={"Don\'t Hesitate"} mainHeader={"Call Us"} />
        <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="+254716570987"> +254716570987</a>
        </div>
        </section>
      </section>
    </>
  );
}
