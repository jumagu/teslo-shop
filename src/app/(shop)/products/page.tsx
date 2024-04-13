export const revalidate = 60;

import { notFound } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";

export const metadata = {
  title: "All Products",
  description:
    "Discover the complete collection of products at Teslo Shop. Find the latest fashion trends and accessories for every style.",
};

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getPaginatedProductsWithImages({ page });

  if (!response) {
    notFound();
  }

  const { products, totalPages } = response;

  return (
    <div className="px-6 sm:px-9 lg:px-12">
      <Title
        title="All Products"
        className="pt-10 text-[24px] leading-[30px] tracking-[1.4px]"
      />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
