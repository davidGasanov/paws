import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";

export const metadata = {
  title: "Shopping cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <div className="min-h-screen">
      <CartTable cart={cart} />
    </div>
  );
};

export default CartPage;
