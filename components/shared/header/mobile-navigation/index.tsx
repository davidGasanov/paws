import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RiMenu2Fill } from "react-icons/ri";
import CategoriesList from "./categories-list";

const MobileNavigation = async () => {
  return (
    <div className="md:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button className="bg-transparent hover:bg-none">
            <RiMenu2Fill className="scale-125" color="#FFF" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Shop by category</DrawerTitle>
            <div className="space-y-1 mt-4 flex flex-col items-start">
              <CategoriesList />
            </div>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
