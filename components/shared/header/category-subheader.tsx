"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CategorySelect from "./category-select";

const CategorySubheader = ({ categories }: { categories: Category[] }) => {
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const pathname = usePathname();
  const hiddenRoutes = ["/search"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop < lastScrollTop) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div
      className={`w-full bg-muted transition-transform duration-300 hidden drop-shadow-md md:block z-10 ${
        isScrolledUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={cn("wrapper")}
        style={{
          paddingTop: "0.25rem",
          paddingBottom: "0",
        }}
      >
        <div className="flex gap-2">
          {categories
            .filter((category) => category.name !== "all")
            .map((category) => (
              <CategorySelect key={category.id} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySubheader;
