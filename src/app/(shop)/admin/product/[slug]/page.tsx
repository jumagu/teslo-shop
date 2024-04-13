import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Title } from "@/components";
import { getCategories, getProductBySlug } from "@/actions";

import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  if (slug === "new") {
    return {
      title: "New Product - Admin Panel",
      description:
        "Add a new product to the collection of Teslo Shop. Complete product details, upload images, and set prices.",
    };
  }

  const product = await getProductBySlug(slug);

  return {
    title: `Edit Product - ${product?.title ?? ""} | Admin Panel`,
    description: `Modify details of ${
      product?.title ?? ""
    } on Teslo Shop admin panel. Update product information, pricing, and availability.`,
  };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") redirect("/admin/products");

  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <div className="w-full sm:max-w-[600px] xm:max-w-[1200px] mx-auto px-6 sm:px-9 lg:px-12">
      <Title
        title={title}
        className="py-6 xm:pb-2 text-[24px] xm:text-[28px] tracking-[1.2px]"
      />

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
