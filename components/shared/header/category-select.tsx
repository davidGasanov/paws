"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Category } from "@/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategorySelect = ({ category }: { category: Category }) => {
  const router = useRouter();

  return (
    <Select
      value={""}
      onValueChange={(value) => router.push(`/search?categoryId=${value}`)}
    >
      <SelectTrigger
        className="w-[70px] py-1 h-8 text-left focus:ring-0 
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
          <Link
            className="block opacity-80 py-1 px-1 space-y-0.5 hover:bg-muted text-sm"
            key={subCategory.id}
            href={`/search?categoryId=${subCategory.id}`}
          >
            {capitalizeFirstLetter(subCategory.name)}
          </Link>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
