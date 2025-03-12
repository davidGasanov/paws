import Image from "next/image";
import Link from "next/link";

const AnimalQuickNav = () => {
  const animalsList = [
    {
      name: "Dogs",
      image: "/images/animal-illustrations/dog-brown.svg",
      categoryId: "81e0c0fb-8f14-40d7-8e99-f5ae5669dfe3",
    },
    {
      name: "Cats",
      image: "/images/animal-illustrations/cat-black.svg",
      categoryId: "1dac0e8c-65ae-4f04-b7ad-af685922c564",
    },
    {
      name: "Birds",
      image: "/images/animal-illustrations/bird-red.svg",
      categoryId: "38d15fbc-0e30-49a6-b4ba-ac392a3d5c61",
    },
    {
      name: "Fish",
      image: "/images/animal-illustrations/fish-yellow.svg",
      categoryId: "85e14fb0-05c6-4025-9b68-d978160ea94f",
    },
  ];

  return (
    <section className="my-[50px] py-[50px] w-screen bg-muted ml-[calc(-50vw+50%)]">
      <div className={"wrapper"}>
        <div className="flex gap-2 md:gap-0 flex-col md:flex-row justify-between md:items-center">
          <h2 className="font-extrabold text-3xl tracking-normal">
            Find the &nbsp;
            <span className="text-secondary italic">Perfect Products</span>
            &nbsp; for Your Pet
          </h2>
          <Link href="/search" className="text-primary">
            View all 
          </Link>
        </div>
        <div className="mt-[26px] md:mt-[46px] w-fit mx-auto grid grid-cols-2 gap-8 md:gap-32 sm:grid-cols-4">
          {animalsList.map((animal) => (
            <Link
              key={animal.name}
              href={`/search?category=${animal.categoryId}`}
              className="flex justify-center items-center w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full shadow-md bg-card transition-all group duration-200 ease-in-out hover:bg-primary30/90 hover:shadow-2xl"
            >
              <Image
                className="w-[90px] md:w-[140px] rounded-full overflow-visible"
                width={200}
                height={200}
                src={animal.image}
                alt={animal.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimalQuickNav;
