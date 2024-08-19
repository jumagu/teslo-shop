"use client";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { useForm } from "react-hook-form";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { Product, ProductImage as ProductWithImage } from "@/interfaces";
import {
  Form,
  FormField,
  ProductImage,
  ErrorFeedback,
  ButtonPrimary,
} from "@/components";
import {
  ProductFormInputs,
  productFormFields,
} from "@/schemas/product-form.schemas";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: { id: string; name: string }[];
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  productFormFields[6].options = categories.map(({ id, name }) => ({
    name,
    value: id,
  }));

  const methods = useForm<ProductFormInputs>({
    mode: "onTouched",
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  const {
    watch,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting, isLoading },
  } = methods;

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

  const onSubmit = async (data: ProductFormInputs) => {
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
      alert("Unable to update the product");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      className="max-w-[850px] grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      {productFormFields.map(
        ({ name, type, label, options, variant, className, validations }) => (
          <FormField
            key={name}
            name={name}
            type={type}
            label={label}
            variant={variant}
            options={options}
            className={className}
            disabled={isSubmitting}
            validations={validations}
            errorVariant="sm"
          />
        )
      )}

      <div className="group">
        <span className="input-label">Sizes</span>
        <div
          className="flex justify-between mt-2"
          aria-describedby="sizes-error"
          {...register("sizes", {
            required: {
              value: true,
              message: "Please select at least one size",
            },
          })}
        >
          {SIZES.map((size) => (
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
        <ErrorFeedback
          id="sizes-error"
          varaint="sm"
          message={errors.sizes?.message}
        />
      </div>

      <div className="group sm:col-span-2">
        <label className="input-label">Images</label>
        <input
          className={clsx("input-primary", {
            error: !!errors.images,
          })}
          multiple
          type="file"
          aria-invalid={!!errors.images}
          aria-describedby="images-error"
          accept="image/png, image/jpeg, image/avif"
          {...register("images", {
            required: {
              value: true,
              message: "Please select at least one image",
            },
          })}
        />
        <ErrorFeedback
          id="images-error"
          varaint="sm"
          message={errors.images?.message}
        />
      </div>

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
    </Form>
  );
};
