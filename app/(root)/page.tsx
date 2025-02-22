import ProductCarousel from "@/components/shared/product/carousel";
import ProductList from "@/components/shared/product/product-list";
import DealCountdown from "@/components/ui/deal-countdown";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
    </>
  );
};

export default HomePage;
