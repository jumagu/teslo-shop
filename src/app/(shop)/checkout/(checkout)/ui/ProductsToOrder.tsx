import { useCartStore } from "@/store";
import { ProductImage } from "@/components";
import { currencyFormatter } from "@/utils";

export const ProductsToOrder = () => {
  const productsInCart = useCartStore((state) => state.cart);

  return (
    <div className="flex flex-col mt-4 min-[600px]:mt-10 gap-4 min-[600px]:gap-10 xm:gap-12 max-w-none xm:max-w-[546px]">
      {productsInCart.map((product) => (
        <div className="flex gap-6" key={`${product.slug}-${product.size}`}>
          <div className="basis-[100%] sm:basis-0 flex-1 max-w-max min-w-max">
            <ProductImage
              className="w-[80px] xm:w-[90px] h-[80px] xm:h-[90px]"
              src={product.image}
              width={500}
              height={500}
              alt={product.title}
            />
          </div>

          <div className="flex-1 basis-[100%] sm:basis-[0%] size-[100%] min-w-[112px] -ml-[6px] xs:ml-[10px] xm:ml-0">
            <p className="font-medium text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
              {product.title}
            </p>
            <p className="font-normal text-black text-opacity-60 pt-[3px] text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
              {product.size}
            </p>
            <p className="font-normal text-black text-opacity-60 pt-[3px] text-[13px] leading-6 tracking-[1.8px]">
              Quantity: {product.quantity}
            </p>
          </div>

          <div className="flex flex-col flex-1 basis-[100%] sm:flex-none min-w-[64px] xs:min-w-[unset] size-[100%] sm:size-[21.67%] items-end">
            <p className="font-medium text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
              {currencyFormatter(product.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
