import { OrderSummary } from "./OrderSummary";
import { ProductsInCart } from "./ProductsInCart";

export const FilledCart = () => {
  return (
    <div className="grid grid-cols-1 xm:grid-cols-2 gap-8 xm:gap-6 fade-in">
      {/* items */}
      <ProductsInCart />

      {/* order summary */}
      <OrderSummary />
    </div>
  );
};
