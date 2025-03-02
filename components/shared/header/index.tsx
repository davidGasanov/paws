import { cn } from "@/lib/utils";
import CategoryDrawer from "./category-drawer";
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
        <div className="bg-background ml-0 mr-0 w-full px-auto z-50">
          <div className={cn("wrapper w-full flex-between border-b")}>
            <div className="flex-start">
              <CategoryDrawer />
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
