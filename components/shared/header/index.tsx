import { cn } from "@/lib/utils";
import MobileNavigation from "./mobile-navigation";
import CategorySubheader from "./category-subheader";
import Logo from "./logo";
import Menu from "./menu";
import Search from "./search";
import { getAllCategories } from "@/lib/actions/category.actions";

const Header = async () => {
  const categories = await getAllCategories({ primariesOnly: true });

  return (
    <header className="sticky w-full top-0 z-10">
      <div className="flex flex-col w-full">
        <div className="bg-primary dark:bg-primary30 ml-0 mr-0 w-full px-auto z-50">
          <div
            className={cn("wrapper w-full flex-between border-b border-none")}
          >
            <div className="flex-start">
              <MobileNavigation />
              <Logo />
            </div>
            <div className="hidden md:block">
              <Search />
            </div>
            <Menu />
          </div>
        </div>
        <CategorySubheader categories={categories} />
      </div>
    </header>
  );
};

export default Header;
