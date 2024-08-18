import type { RegisterOptions } from "react-hook-form";
import { FormField, Gender, SelectOption } from "@/interfaces";

const genderOptions: SelectOption<Gender>[] = [
  { name: "Men", value: "men" },
  { name: "Women", value: "women" },
  { name: "Kids", value: "kids" },
  { name: "Unisex", value: "unisex" },
];

export type ProductFormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  gender: Gender;
  categoryId: string;
  tags: string;
  sizes: string[];
  images: FileList;
};

const productFormValidations: Record<
  keyof ProductFormInputs,
  RegisterOptions<ProductFormInputs>
> = {
  title: {
    required: {
      value: true,
      message: "Please populate this field - Title",
    },
  },
  slug: {
    required: {
      value: true,
      message: "Please populate this field - Slug",
    },
  },
  description: {
    required: {
      value: true,
      message: "Please populate this field - Description",
    },
  },
  price: {
    required: {
      value: true,
      message: "Please populate this field - Price",
    },
    min: {
      value: 0,
      message: "Please populate this field with a valid price",
    },
  },
  inStock: {
    required: {
      value: true,
      message: "Please populate this field - Stock",
    },
    min: {
      value: 0,
      message: "Please populate this field with a valid stock number",
    },
  },
  gender: {
    required: {
      value: true,
      message: "Please populate this field - Gender",
    },
  },
  categoryId: {
    required: {
      value: true,
      message: "Please populate this field - Category",
    },
  },
  tags: {
    required: {
      value: true,
      message: "Please populate this field - Tags",
    },
  },
  sizes: {},
  images: {},
};

export const productFormFields: FormField[] = [
  {
    name: "title",
    type: "text",
    label: "Title",
    validations: productFormValidations.title,
  },
  {
    name: "slug",
    type: "text",
    label: "Slug",
    validations: productFormValidations.slug,
  },
  {
    name: "description",
    label: "Description",
    variant: "textarea",
    className: "sm:col-span-2",
    validations: productFormValidations.description,
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    validations: productFormValidations.price,
  },
  {
    name: "inStock",
    type: "number",
    label: "Stock",
    validations: productFormValidations.inStock,
  },
  {
    name: "gender",
    label: "Gender",
    variant: "select",
    options: genderOptions,
    validations: productFormValidations.gender,
  },
  {
    name: "categoryId",
    label: "Category",
    variant: "select",
    validations: productFormValidations.categoryId,
  },
  {
    name: "tags",
    type: "text",
    label: "Tags",
    validations: productFormValidations.tags,
  },
];
