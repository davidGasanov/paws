import { FaGift, FaTruck } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import FeatureCard from "./feature-card";

const featuresList = [
  {
    title: "Fast & Free Shipping",
    Icon: FaTruck,
    description:
      "Get free shipping on orders over $50—fast, hassle-free delivery to your door!",
  },
  {
    title: "Premium Quality, Pet-Approved",
    Icon: IoShieldCheckmark,
    description:
      "We offer high-quality, vet-approved food, toys, and accessories for your pet’s safety and comfort.",
  },
  {
    title: "Rewards & Exclusive Deals",
    Icon: FaGift,
    description:
      "Earn points on every purchase and unlock special discounts, early access, and exclusive perks!",
  },
];

const Features = () => {
  return (
    <section className="mt-16 md:mt-20 bg-muted ml-[calc(-50vw+50%)] w-screen py-10 md:py-20">
      <div className="flex flex-col md:flex-row gap-4 justify-between wrapper">
        {featuresList.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
