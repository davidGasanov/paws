import Link from "next/link";
import { Button } from "./ui/button";
import { HiShoppingCart } from "react-icons/hi";

const ViewAllProductsButton = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <div className="flex">
          <HiShoppingCart className="shrink-0 scale-[115%]" />
          <Link href="/search" className="flex items-center">
            View all products
          </Link>
        </div>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
