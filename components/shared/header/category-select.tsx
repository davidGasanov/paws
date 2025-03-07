"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Category } from "@/types";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const CategorySelect = ({ category }: { category: Category }) => {
  const router = useRouter();

  return (
    <Select
      value={""}
      onValueChange={(value) => router.push(`/search?categoryId=${value}`)}
    >
      <SelectTrigger
        className="w-[70px] text-left focus:ring-0 
      focus:ring-offset-0 bg-transparent group rounded-none 
       outline-none transition-all duration-200
      border-t-transparent border-l-transparent border-r-transparent border-b-transparent 
      relative"
      >
        <SelectValue placeholder={capitalizeFirstLetter(category.name)} />
        <ChevronDown
          className={`h-4 w-4 opacity-50 transition-transform 
            duration-200 ease-in-out group-data-[state=open]:rotate-180`}
        />
      </SelectTrigger>
      <SelectContent>
        {category.subcategories?.map((subCategory) => (
          <SelectItem
            key={subCategory.id}
            value={subCategory.id}
            className="cursor-pointer justify-start"
          >
            {capitalizeFirstLetter(subCategory.name)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
