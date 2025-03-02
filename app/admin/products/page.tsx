import { Button } from "@/components/ui/button";
import { deleteProduct, getAllProducts } from "@/lib/actions/product.actions";
import Link from "next/link";
import {
  TableHeader,
  TableBody,
  TableRow,
  Table,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatCurrency, formatId } from "@/lib/utils";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import { requireAdmin } from "@/lib/auth-guard";

const AdminProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; categoryId: string }>;
}) => {
  const searchParams = await props.searchParams;
  await requireAdmin();

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const categoryId = searchParams.categoryId || "";

  const products = await getAllProducts({
    query: searchText,
    limit: 5,
    categoryId,
    page,
  });

  return (
    <>
      <div className="space-y-2">
        <div className="flex-between">
          <div className="flex items-center gap-3">
            <h1 className="h2-bold">Products</h1>
            {searchText && (
              <div>
                Filtered by <i>&quot;{searchText}&quot;</i>{" "}
                <Link href="/admin/products">
                  <Button variant="outline" size={"sm"}>
                    Remove filter
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <Button variant="default" asChild>
            <Link href="/admin/products/create">Create product</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell>
                  {product.category.name} {product.category.parent?.name}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  <Button size={"sm"} asChild variant="outline">
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                  {/* DELETE (TO-DO) */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products.totalPages && products.totalPages > 1 && (
          <Pagination page={page} totalPages={products.totalPages} />
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
