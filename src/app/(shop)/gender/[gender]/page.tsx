export const revalidate = 60;

import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";

import { capitalize } from "@/utils";
import { Gender } from "@prisma/client";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";

interface Props {
  params: { gender: string };
  searchParams: { page?: string };
}

export function generateMetadata({ params: { gender } }: Props): Metadata {
  return {
    title: `Apparel ${capitalize(gender)}`,
    description: `Explore our collection of ${gender} on Teslo Shop. Find a wide range of stylish and trendy products to suit your preferences.`,
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const response = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (!response) {
    notFound();
  }

  const { products, totalPages } = response;

  if (products.length === 0) redirect("/");

  return (
    <div className="px-6 sm:px-9 lg:px-12">
      <Title
        title={gender}
        className="pt-10 text-[24px] leading-[30px] tracking-[1.4px]"
      />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
