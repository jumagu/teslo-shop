"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

import prisma from "@/lib/prisma";
import { Gender, type Product, type Size } from "@prisma/client";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const parsedProduct = productSchema.safeParse(data);

  if (!parsedProduct.success) {
    console.log(parsedProduct.error);

    return {
      ok: false,
    };
  }

  const product = parsedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "_").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;

      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: {
            id,
          },

          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // * Upload images to clouddinary
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);

        if (!images) throw new Error("The images could not be loaded.");

        await prisma.productImage.createMany({
          data: images.map((img) => ({
            url: img!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // * Path Revalidations
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      msg: "An error ocurred while creating/updating the product.",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: "teslo-shop",
          })
          .then((resp) => resp.secure_url);
      } catch (error) {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    console.log(error);

    return null;
  }
};
