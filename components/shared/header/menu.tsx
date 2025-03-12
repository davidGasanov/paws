import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button
          asChild
          variant="ghost"
          className="bg-none hover:bg-primary hover:text-[#FFF] dark:hover:bg-primary-foreground"
        >
          <Link href="/cart" className="text-[#FFF]">
            <ShoppingCart color="#FFF" /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical color="#FFF" className="opacity-85" />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle className="flex items-center justify-between w-full">
              Menu
            </SheetTitle>

            <ModeToggle />
            <Button asChild>
              <Link href="/cart" className="w-full">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
