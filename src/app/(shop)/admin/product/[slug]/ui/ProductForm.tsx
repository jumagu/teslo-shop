"use client";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { type SubmitHandler, useForm } from "react-hook-form";

import { ButtonPrimary, ProductImage } from "@/components";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { Product, ProductImage as ProductWithImage } from "@/interfaces";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: { id: string; name: string }[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  gender: "men" | "women" | "kids" | "unisex";
  categoryId: string;
  tags: string;
  sizes: string[];
  images: FileList;
};

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    watch,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  // ? Pending changes (in sizes) to render the form again.
  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));

    if (getValues("sizes").length < 1) {
      setError("sizes", {
        type: "required",
        message: "Please select at least one size",
      });
    } else {
      clearErrors("sizes");
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) formData.append("id", product.id ?? "");

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("tags", productToSave.tags);
    formData.append("sizes", productToSave.sizes.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      // ! sweetalert
      alert("Unable to update the product");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      className="max-w-[850px] grid grid-cols-1 sm:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="group">
        <span className="input-label">Title</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.title,
          })}
          aria-invalid={!!errors.title}
          type="text"
          {...register("title", {
            required: {
              value: true,
              message: "Please populate this field - Title",
            },
          })}
        />
        {errors.title && (
          <p className="input-error-alert-product" role="alert">
            {errors.title.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Slug</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.slug,
          })}
          aria-invalid={!!errors.slug}
          type="text"
          {...register("slug", {
            required: {
              value: true,
              message: "Please populate this field - Slug",
            },
          })}
        />
        {errors.slug && (
          <p className="input-error-alert-product" role="alert">
            {errors.slug.message}
          </p>
        )}
      </label>

      <label className="sm:col-span-2 group">
        <span className="input-label">Description</span>
        <textarea
          className={clsx("input-primary__textarea", {
            error: !!errors.description,
          })}
          aria-invalid={!!errors.description}
          {...register("description", {
            required: {
              value: true,
              message: "Please populate this field - Description",
            },
          })}
        />
        {errors.description && (
          <p className="input-error-alert-product" role="alert">
            {errors.description.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Price</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.price,
          })}
          aria-invalid={!!errors.price}
          type="number"
          {...register("price", {
            required: {
              value: true,
              message: "Please populate this field - Price",
            },
            min: {
              value: 0,
              message: "Please populate this field with a valid price",
            },
          })}
        />
        {errors.price && (
          <p className="input-error-alert-product" role="alert">
            {errors.price.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Stock</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.inStock,
          })}
          aria-invalid={!!errors.inStock}
          type="number"
          {...register("inStock", {
            required: {
              value: true,
              message: "Please populate this field - Stock",
            },
            min: {
              value: 0,
              message: "Please populate this field with a valid stock number",
            },
          })}
        />
        {errors.inStock && (
          <p className="input-error-alert-address" role="alert">
            {errors.inStock.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Gender</span>
        <select
          className={clsx("input-primary !bg-white", {
            error: !!errors.gender,
          })}
          aria-invalid={!!errors.gender}
          {...register("gender", {
            required: {
              value: true,
              message: "Please populate this field - Gender",
            },
          })}
        >
          <option value="">Select Gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
          <option value="unisex">Unisex</option>
        </select>
        {errors.gender && (
          <p className="input-error-alert-address" role="alert">
            {errors.gender.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Category</span>
        <select
          className={clsx("input-primary !bg-white", {
            error: !!errors.categoryId,
          })}
          aria-invalid={!!errors.categoryId}
          {...register("categoryId", {
            required: {
              value: true,
              message: "Please populate this field - Category",
            },
          })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="input-error-alert-address" role="alert">
            {errors.categoryId.message}
          </p>
        )}
      </label>

      <label className="group">
        <span className="input-label">Tags</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.tags,
          })}
          aria-invalid={!!errors.tags}
          type="text"
          {...register("tags", {
            required: {
              value: true,
              message: "Please populate this field - Tags",
            },
          })}
        />
        {errors.tags && (
          <p className="input-error-alert-address" role="alert">
            {errors.tags.message}
          </p>
        )}
      </label>

      <label>
        <span className="input-label">Sizes</span>
        <div
          className="flex justify-between mt-2"
          {...register("sizes", {
            required: {
              value: true,
              message: "Please select at least one size",
            },
          })}
        >
          {sizes.map((size) => (
            <div
              key={size}
              className={clsx(
                "flex justify-center items-center w-[45px] h-[46px] text-gray-600 font-medium text-[13px] tracking-[1.8px] border hover:border-gray-600 cursor-pointer transition-all duration-300 select-none",
                {
                  "bg-gray-200": getValues("sizes").includes(size),
                  "border-gray-300": !!!errors.sizes,
                  "border-red-500": !!errors.sizes,
                }
              )}
              onClick={() => onSizeChanged(size)}
            >
              {size}
            </div>
          ))}
        </div>
        {errors.sizes && (
          <p className="input-error-alert-address" role="alert">
            {errors.sizes.message}
          </p>
        )}
      </label>

      <label className="sm:col-span-2 group">
        <span className="input-label">Images</span>
        <input
          className={clsx("input-primary", {
            error: !!errors.images,
          })}
          multiple
          type="file"
          aria-invalid={!!errors.images}
          accept="image/png, image/jpeg, image/avif"
          {...register("images", {
            required: {
              value: true,
              message: "Please select at least one image",
            },
          })}
        />
        {errors.images && (
          <p className="input-error-alert-address" role="alert">
            {errors.images.message}
          </p>
        )}
      </label>

      <div className="flex gap-2 sm:col-span-2">
        {product.ProductImage?.map((img) => (
          <div key={img.id}>
            <ProductImage
              className="h-36 w-36"
              src={img.url}
              width={1000}
              height={1000}
              alt={product.title!}
            />

            <button
              type="button"
              className="btn-danger"
              onClick={() => deleteProductImage(img.id, img.url)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="w-full sm:max-w-[206px] pt-2 pb-12">
        <ButtonPrimary
          type="submit"
          text="Save"
          disabled={isSubmitting || isLoading}
        />
      </div>
    </form>
  );
};
