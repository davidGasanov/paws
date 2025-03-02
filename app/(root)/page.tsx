import ProductCarousel from "@/components/shared/product/carousel";
import ProductList from "@/components/shared/product/product-list";
import { Button } from "@/components/ui/button";
import DealCountdown from "@/components/ui/deal-countdown";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getAllCategories,
  insertCategory,
} from "@/lib/actions/category.actions";
import {
  createProduct,
  getFeaturedProducts,
  getLatestProducts,
  getProductById,
} from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // const featuredProducts = await getFeaturedProducts();

  const sampleCategoryData = {
    name: "Test category",
    subcategories: [
      { name: "Test subcategory 1" },
      { name: "Test subcategory 2" },
      { name: "Test subcategory 3" },
    ],
  };

  const testProductData = {
    name: "Sample Product with Subcategory",
    slug: "sample-product-with-subcategory",
    categoryId: "2b241d7a-079f-4b34-8554-bbddadf19eb9", // This should match the subcategory name
    description: "Sample product description",
    images: ["/images/sample-products/sample.jpg"],
    price: "49.99",
    brand: "Sample Brand",
    rating: 4.0,
    numReviews: 5,
    stock: 10,
    isFeatured: false,
    banner: null,
  };

  async function handleAddTestCategory() {
    "use server";
    const res = await insertCategory({ data: sampleCategoryData });
    console.log("add res: ", res);
  }

  async function handleAddTestProduct() {
    "use server";
    const res = await createProduct(testProductData);
    console.log("add res: ", res);
  }

  const testProduct = await getProductById(
    "b6d39bae-001e-4f8e-b986-ecd767a55fdb"
  );
  console.log("test prod: ", testProduct);

  const allCategories = await getAllCategories({ primariesOnly: true });
  console.log("all categories: ", allCategories);

  return (
    <>
      {/* {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )} */}
      <ProductList data={latestProducts} title="Newest arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />

      {/* Test insert category */}
      <div className="mt-10 flex gap-4">
        <Button onClick={handleAddTestCategory}>Add category</Button>
        <Button onClick={handleAddTestProduct}>Add product</Button>
      </div>
    </>
  );
};

export default HomePage;
