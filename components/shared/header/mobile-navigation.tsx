import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/category.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const MobileNavigation = async () => {
  const categories = await getAllCategories({ excludeAll: true });

  return (
    <div className="md:hidden">
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
              {categories.map((category) => (
                <Button
                  key={category.id}
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <DrawerClose asChild>
                    <Link href={`/search/${category.id}`} className="flex">
                      {category.name} ({category?._count?.products})
                    </Link>
                  </DrawerClose>
                </Button>
              ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
