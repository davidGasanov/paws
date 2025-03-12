import { LucideProps } from "lucide-react";
import React from "react";
import { IconType } from "react-icons/lib";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >
    | IconType;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className="rounded-xl shadow-md relative bg-card hover:bg-primary30 group py-4 px-3 max-w-[380px] z-0 cursor-pointer hover:shadow-lg transition-all hover:text-primary-foreground duration-500 dark:hover:text-foreground">
      <div className="absolute inset-0 rounded-xl w-full h-full bg-[url('/images/background/pet-pattern.jpg')] bg-cover bg-center bg-blend-multiply filter grayscale opacity-[0.08]" />

      <div className="relative inset-0 z-10 flex flex-col gap-2.5 items-center text-center">
        <Icon className="w-8 h-8 fill-primary30 group-hover:fill-primary-foreground dark:fill-foreground transition-all duration-500 dark:group-hover:fill-foreground" />
        <div className="text-[20px] font-bold opacity-85 group-hover:opacity-100">
          {title}
        </div>
        <div className="text-base opacity-80 group-hover:opacity-100">
          {description}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
