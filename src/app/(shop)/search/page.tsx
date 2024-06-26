import { Product } from "@/interfaces";
import { Pagination, ProductsGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

export const metadata = {
  title: "Search",
  description: "Search for products on Teslo Shop.",
};

interface Props {
  searchParams: {
    page?: string;
    searchTerm?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchTerm =
    searchParams.searchTerm && searchParams.searchTerm.length >= 2
      ? searchParams.searchTerm
      : "";

  let results: Product[] = [];
  let totalPages: number = 0;

  if (searchTerm.length > 2) {
    const response = await getPaginatedProductsWithImages({
      page,
      query: searchTerm,
    });

    if (!response) {
      results = [];
      return;
    }

    results = response.products;
    totalPages = response.totalPages;
  }

  return (
    <div className="w-full pt-10 mx-auto px-6 min-[600px]:px-9 mlg:px-12">
      <h2 className="font-light pt-8 pb-2 text-[24px] leading-[30px] tracking-[0.9px]">
        Results for <span className="font-medium">{searchTerm}</span>
      </h2>

      {!searchTerm ? (
        <p className="font-normal mt-[15px] text-[12px] tracking-[1.8px] text-gray-500">
          Please enter 2 or more characters
        </p>
      ) : !results.length ? (
        <p className="font-normal mt-[15px] text-[12px] tracking-[1.8px]">
          No results found
        </p>
      ) : (
        <>
          <ProductsGrid products={results} />
          <Pagination totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
