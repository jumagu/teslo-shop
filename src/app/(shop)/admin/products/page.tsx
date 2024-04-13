export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";

import { MdEditNote } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

import { getPaginatedProductsWithImages } from "@/actions";
import { ButtonSecondary, Pagination, ProductImage, Title } from "@/components";

export const metadata = {
  title: "Manage Products - Admin Panel",
  description:
    "Administer products and inventory on Teslo Shop admin panel. Update product details, manage stock, and more.",
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getPaginatedProductsWithImages({
    page,
    take: 6,
  });

  if (!response) notFound();

  const { products, totalPages } = response;

  return (
    <div className="w-full xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
      <Title
        title="All Products"
        className="pt-6 xm:pt-10 text-[28px] leading-[34px] tracking-[1.4px]"
      />

      <div className="flex flex-row-reverse mb-3 mt-6">
        <div className="w-full min-[500px]:w-60 transition-all">
          <ButtonSecondary text="Add Product" href="/admin/product/new" />
        </div>
      </div>

      <div className="w-full overflow-auto mb-6">
        <table className="w-full border">
          <thead className="bg-gray-200 border-b">
            <tr className="tracking-[1.2px]">
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                In Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products!.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <ProductImage
                    className="w-16 h-16 object-cover"
                    src={product.ProductImage[0]?.url}
                    width={500}
                    height={500}
                    alt={product.title}
                  />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.title}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/product/${product.slug}`}>
                      <TbListDetails
                        className="text-zinc-500 hover:text-blue-600 transition-all duration-[.33s]"
                        size={25}
                      />
                    </Link>

                    <Link href={`/admin/product/${product.slug}`}>
                      <MdEditNote
                        className="text-zinc-500 hover:text-orange-500 transition-all duration-[.33s]"
                        size={25}
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
