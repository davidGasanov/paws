import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";
import Link from "next/link";
import { SEARCH_FILTERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/actions/category.actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FileQuestion, XIcon } from "lucide-react";

interface SearchParams {
  categoryId?: string;
  query?: string;
  price?: string;
  rating?: string;
  sort?: string;
  page?: string;
}

export async function generateMetadata(props: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    categoryId = "all",
    query = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = query && query !== "all" && query.trim() !== "";
  const isCategorySet =
    categoryId && categoryId !== "all" && categoryId.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? `${query}` : ""} ${
        isCategorySet ? `in ${categoryId}` : ""
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
    categoryId = "",
    query = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const { prices, ratings, sortOrders } = SEARCH_FILTERS;

  const products = await getAllProducts({
    categoryId,
    query,
    price,
    rating,
    sort,
    page: Number(page),
  });

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    q,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    q?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params: SearchParams = {
      query,
      categoryId,
      price,
      rating,
      sort,
      page,
    };

    if (c) params.categoryId = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (q) params.query = q;

    const searchParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    );
    return `/search?${new URLSearchParams(searchParams).toString()}`;
  };

  const mainCategories = await getAllCategories({
    primariesOnly: true,
    excludeAll: true,
  });

  const collapsedMainCategory =
    mainCategories.find((mainCat) => {
      return mainCat?.subcategories?.some((subCat) => subCat.id === categoryId);
    }) || mainCategories.find((mainCat) => mainCat.id === categoryId);
  console.log(collapsedMainCategory);

  for (const category of mainCategories) {
    let subcategoryProductCount = 0;
    if (category.subcategories) {
      for (const subcategory of category?.subcategories) {
        subcategoryProductCount += subcategory._count?.products || 0;
      }
      if (category._count?.products !== undefined)
        category._count.products += subcategoryProductCount;
    }
  }

  console.log("main categories after update: ", mainCategories);
  const allCategories = await getAllCategories({
    primariesOnly: false,
    excludeAll: true,
  });

  const getCategoryName = () => {
    return allCategories.find((category) => category.id === categoryId)?.name;
  };

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <div className="text-xl mb-4 mt-3">Department</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={cn("font-semibold opacity-70", {
                "font-bold opacity-100":
                  categoryId === "" || categoryId === "all",
              })}
              href={getFilterUrl({ c: "all" })}
            >
              Any
            </Link>
          </li>
          <Accordion
            type="single"
            collapsible
            defaultValue={collapsedMainCategory?.id}
          >
            {mainCategories.map((x) => {
              return (
                <AccordionItem key={x.id} className="border-b" value={x.id}>
                  <AccordionTrigger
                    className={cn(
                      `py-1 font-semibold opacity-65 hover:opacity-100`,
                      {
                        "opacity-100 font-bold":
                          categoryId === x.id ||
                          collapsedMainCategory?.id === x.id,
                      }
                    )}
                  >
                    <span className="flex items-center justify-start group">
                      <span className="w-12 block text-left">
                        {capitalizeFirstLetter(x.name)}{" "}
                      </span>
                      <span className="font-medium text-[14px] opacity-80 group-hover:no-underline hover:decoration-none">
                        ({x?._count?.products})
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="pl-2 flex flex-col gap-1">
                      <li key={x.id}>
                        <Link
                          className={cn("opacity-[0.68] hover:opacity-100", {
                            "font-bold opacity-100": categoryId === x.id,
                          })}
                          href={getFilterUrl({
                            c: x.id,
                          })}
                        >
                          All
                        </Link>
                      </li>
                      {x?.subcategories?.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            className={cn("opacity-[0.68] hover:opacity-100", {
                              "font-bold opacity-100": categoryId === sub.id,
                            })}
                            href={getFilterUrl({
                              c: sub.id,
                            })}
                          >
                            {capitalizeFirstLetter(sub.name)}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ul>

        <div className="text-xl mb-2 mt-8">Price</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={`${price === "all" && "font-bold opacity-100"} opacity-[0.68] hover:opacity-100`}
              href={getFilterUrl({ p: "all" })}
            >
              Any
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                className={`${price === p.value && "font-bold opacity-100"} opacity-[0.68] hover:opacity-100`}
                href={getFilterUrl({
                  p: p.value,
                })}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-xl mb-2 mt-8">Customer ratings</div>
        <ul className="space-y-1">
          <li>
            <Link
              className={`${rating === "all" && "font-bold opacity-100"} opacity-[0.68] hover:opacity-100`}
              href={getFilterUrl({ r: "all" })}
            >
              Any
            </Link>
          </li>
          {ratings.map((r) => (
            <li key={r}>
              <Link
                className={`${rating === r.toString() && "font-bold opacity-100"} opacity-[0.68] hover:opacity-100`}
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
        <div className="flex-wrap flex flex-col gap-2 my-4 md:flex-between md:flex-row">
          <div className="flex items-center gap-2">
            {query !== "all" && query !== "" && (
              <Badge className="p-2" variant={"secondary"}>
                {`Query: ` + query}
                <Link href={getFilterUrl({ q: "all" })}>
                  <XIcon className="opacity-90 ml-1 cursor-pointer" size={16} />
                </Link>
              </Badge>
            )}{" "}
            {categoryId !== "" && categoryId !== "all" && (
              <Badge className="p-2" variant={"secondary"}>
                {`Category: ` + getCategoryName()}
                <Link href={getFilterUrl({ c: "all" })}>
                  <XIcon className="opacity-90 ml-1 cursor-pointer" size={16} />
                </Link>
              </Badge>
            )}
            {price !== "all" && (
              <Badge className="p-2" variant={"secondary"}>
                {"Price: " + price}
                <Link href={getFilterUrl({ p: "all" })}>
                  <XIcon className="opacity-90 ml-1 cursor-pointer" size={16} />
                </Link>
              </Badge>
            )}
            {rating !== "all" && (
              <Badge className="p-2" variant={"secondary"}>
                {"Rating: " + rating + " Stars & up"}
                <Link href={getFilterUrl({ r: "all" })}>
                  <XIcon className="opacity-90 ml-1 cursor-pointer" size={16} />
                </Link>
              </Badge>
            )}
            &nbsp;
            {(query !== "all" && query !== "") ||
            categoryId !== "" ||
            (price !== "all" && price !== "") ||
            (rating !== "all" && rating !== "") ? (
              <Button variant="link" asChild>
                <Link href="/search">Clear all</Link>
              </Button>
            ) : null}
          </div>
          <div className="flex">
            <span className="font-semibold"> Sort by:</span>{" "}
            <div className="flex gap-1 ml-3">
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  href={getFilterUrl({ s })}
                  className={`mx-1 ${sort == s && "font-bold"}`}
                >
                  {s}
                </Link>
              ))}{" "}
            </div>
          </div>
        </div>
        {!products?.data?.length ? (
          <div className="w-full h-full">
            <div className="flex flex-col items-center gap-4 mt-12">
              <FileQuestion size={120} className="opacity-45" strokeWidth={2} />
              <span className="font-semibold opacity-65">
                No products found
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
