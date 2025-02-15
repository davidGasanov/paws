import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Select the category</DrawerTitle>
            <div className="space-y-1 mt-4 flex flex-col items-start">
              {categories.map(({ category, _count }) => (
                <Button
                  key={category}
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <DrawerClose asChild>
                    <Link
                      href={`/search/${category}`}
                      className="flex"
                    >
                      {category} ({_count})
                    </Link>
                  </DrawerClose>
                </Button>
              ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CategoryDrawer;
