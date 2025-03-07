"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawerClose } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/lib/actions/category.actions";
import { capitalizeFirstLetter, cn, formatError } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoriesList = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [mainCategories, setMainCategories] = useState<Category[]>([]);

  const handleGetAllCategories = async () => {
    try {
      const res = await getAllCategories({
        primariesOnly: true,
        excludeAll: true,
      });

      for (const category of res) {
        let subcategoryProductCount = 0;
        if (category.subcategories) {
          for (const subcategory of category?.subcategories) {
            subcategoryProductCount += subcategory._count?.products || 0;
          }
          if (category._count?.products !== undefined)
            category._count.products += subcategoryProductCount;
        }
      }

      setMainCategories(res);
    } catch (error) {
      toast({
        title: "Error",
        description: formatError(error),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const collapsedMainCategory =
    mainCategories.find((mainCat) => {
      return mainCat?.subcategories?.some((subCat) => subCat.id === categoryId);
    }) || mainCategories.find((mainCat) => mainCat.id === categoryId);
  console.log(collapsedMainCategory);

  return (
    <>
      <Accordion
        className="w-full"
        type="single"
        collapsible
        defaultValue={collapsedMainCategory?.id}
      >
        {mainCategories.map((x) => {
          return (
            <AccordionItem key={x.id} className="border-b" value={x.id}>
              <AccordionTrigger
                className={cn(
                  `py-3 font-semibold opacity-65 hover:opacity-100 hover:no-underline`,
                  {
                    "opacity-100 font-bold":
                      categoryId === x.id || collapsedMainCategory?.id === x.id,
                  }
                )}
              >
                <span className="flex items-center justify-start group no-underline decoration-none hover:no-underline hover:decoration-none">
                  <span className="w-12 block text-left text-lg">
                    {capitalizeFirstLetter(x.name)}{" "}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-2 bg-muted">
                <div className="px-3 flex flex-col">
                  <li key={x.id} className="list-none text-start py-1.5">
                    <Link
                      className={cn(
                        "opacity-[0.68] hover:opacity-100 text-base",
                        {
                          "font-bold opacity-100": categoryId === x.id,
                        }
                      )}
                      href={`/search?categoryId=${x.id}`}
                    >
                      All
                    </Link>
                  </li>
                  <Separator className="" />
                  {x?.subcategories?.map((sub, index) => (
                    <React.Fragment key={sub.id}>
                      <DrawerClose asChild>
                        <li className="list-none text-start py-1.5">
                          <Link
                            className={cn(
                              "opacity-[0.68] text-base hover:opacity-100",
                              {
                                "font-bold opacity-100": categoryId === sub.id,
                              }
                            )}
                            href={`/search?categoryId=${sub.id}`}
                          >
                            <DrawerClose>
                              {capitalizeFirstLetter(sub.name)}
                            </DrawerClose>
                          </Link>
                        </li>
                      </DrawerClose>
                      {index !== (x?.subcategories?.length || 0) - 1 && (
                        <Separator />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default CategoriesList;
