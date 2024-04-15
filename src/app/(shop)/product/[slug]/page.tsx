export const revalidate = 604800;

import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { AddToCart } from "./ui/AddToCart";
import { getProductBySlug } from "@/actions";
import { ProductSlideShow } from "@/components";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProductBySlug(slug);

  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      images: [`/images/products/${product?.images[0]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { title, price, description, images, inStock } = product;

  return (
    <div className="mt-0 xm:mt-9 p-0 xm:px-9 mlg:px-12 grid grid-cols-1 xm:grid-cols-[70%_30%] xm:mr-[34px] xm:mb-6">
      {/* Slideshow */}
      <div className="xm:pr-8">
        <ProductSlideShow
          title={title}
          images={images}
          inStockLabel={inStock === 0}
        />
      </div>
      {/* Details */}
      <div className="px-6 xm:pl-4 xm:-mr-[26.2px] xm:pr-0 mt-8 xm:mt-0 mb-4 xm:mb-0">
        <h2 className="font-medium text-[24px] xm:text-[28px] leading-[30px] xm:leading-[40px] tracking-[1.2px] xm:tracking-[1.4px] antialiased">
          {title}
        </h2>

        <div className="max-w-[340px]">
          <p className="font-medium text-[16px] xm:text-[18px] leading-[24px] xm:leading-[22px] tracking-[0.8px] xm:tracking-[0.9px] mt-2 xm:mt-[2px] mb-8">
            ${price}
          </p>

          {inStock > 0 ? (
            <AddToCart product={product} />
          ) : (
            <div className="font-medium text-gray-700 text-[13px] leading-[26px] tracking-[1.8px]">
              This item is out of stock
            </div>
          )}
        </div>

        {/* description */}
        <div className="mt-3 xm:mb-5 pt-5 xm:pb-5">
          <legend className="font-semibold text-gray-700 text-[13px] leading-[26px] tracking-[1.8px] pb-3 antialiased">
            Description
          </legend>
          <p className="font-normal text-gray-700 text-[12px] xm:text-[13px] leading-[24px] tracking-[1.65px] xm:tracking-[1.8px] xm:max-w-[680px] antialiased">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
