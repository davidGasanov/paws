import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import { SEARCH_FILTERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface SearchParams {
  category?: string;
  q?: string;
  price?: string;
  rating?: string;
  sort?: string;
  page?: string;
}

export async function generateMetadata(props: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    category = "all",
    q = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? `${q}` : ""} ${
        isCategorySet ? `in ${category}` : ""
      } ${isPriceSet ? `priced ${price}` : ""} ${
        isRatingSet ? `rated ${rating} stars & up` : ""
      }`,
    };
  } else {
    return {
      title: "Search products",
    };
  }
}

const SearchPage = async (props: { searchParams: Promise<SearchParams> }) => {
  const {
    category = "all",
    q = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const { prices, ratings, sortOrders } = SEARCH_FILTERS;

  const products = await getAllProducts({
    category,
    query: q,
    price,
    rating,
    sort,
    page: Number(page),
  });

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = {
      q,
      category,
      price,
      rating,
      sort,
      page,
    };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const allCategories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <div className="text-xl mb-2 mt-3">Department</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={`${
                (category === "all" || category === "") && "font-bold"
              }`}
              href={getFilterUrl({ c: "all" })}
            >
              Any
            </Link>
          </li>
          {allCategories.map((x) => (
            <li key={x.category}>
              <Link
                className={`${category === x.category && "font-bold"}`}
                href={getFilterUrl({
                  c: x.category,
                })}
              >
                {x.category}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-xl mb-2 mt-3">Price</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={`${price === "all" && "font-bold"}`}
              href={getFilterUrl({ p: "all" })}
            >
              Any
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                className={`${price === p.value && "font-bold"}`}
                href={getFilterUrl({
                  p: p.value,
                })}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-xl mb-2 mt-3">Customer ratings</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={`${rating === "all" && "font-bold"}`}
              href={getFilterUrl({ r: "all" })}
            >
              Any
            </Link>
          </li>
          {ratings.map((r) => (
            <li key={r}>
              <Link
                className={`${rating === r.toString() && "font-bold"}`}
                href={getFilterUrl({
                  r: r.toString(),
                })}
              >
                {`${r} stars and up`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 md:col-span-4">
        <div className="flex-between flex-col my-4 md:flex-row">
          <div className="flex items-center">
            {q !== "all" && q !== "" && `Query: ` + q + ";"}{" "}
            {category !== "all" &&
              category !== "" &&
              `Category: ` + category + ";"}{" "}
            {price !== "all" && "Price: " + price + ";"}{" "}
            {rating !== "all" && "Rating: " + rating + "Stars & up;"}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            (price !== "all" && price !== "") ||
            (rating !== "all" && rating !== "") ? (
              <Button variant="link" asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                href={getFilterUrl({ s })}
                className={`mx-2 ${sort == s && "font-bold"}`}
              >
                {s}
              </Link>
            ))}{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {!products?.data?.length && <div>No products found</div>}
          {products.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
