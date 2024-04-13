import { useCartStore } from "@/store";
import { ProductImage } from "@/components";
import { currencyFormatter } from "@/utils";

const availableQuantities: number[] = [1, 2, 3, 4, 5];

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

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
            <p className="font-medium text-[13px] leading-6 tracking-[1.8px]">
              {product.title}
            </p>
            <p className="font-normal text-black text-opacity-60 pt-[3px] text-[13px] leading-6 tracking-[1.8px]">
              {product.size}
            </p>

            <div className="flex items-center gap-4 pt-[3px]">
              <div className="flex gap-1">
                <span className="font-normal text-black text-opacity-60 text-[13px] leading-6 tracking-[1.8px]">
                  Quantity:
                </span>
                <select
                  className="!bg-white font-normal text-black text-opacity-60 text-[13px] leading-6 focus:outline-1 focus:outline-dashed focus:outline-gray-600 p-1"
                  value={product.quantity}
                  onChange={(event) =>
                    updateProductQuantity(product, Number(event.target.value))
                  }
                >
                  {availableQuantities.map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn-remove-item"
                onClick={() => removeProductFromCart(product)}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 basis-[100%] sm:flex-none min-w-[64px] xs:min-w-[unset] size-[100%] sm:size-[21.67%] items-end">
            <p className="font-medium text-[13px] leading-6 tracking-[1.8px]">
              {currencyFormatter(product.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
