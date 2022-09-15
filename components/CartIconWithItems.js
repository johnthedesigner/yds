// import {useCartLinesTotalQuantity} from '@shopify/hydrogen/client';

import { useContext } from "react";
import { CartContext } from "../pages/_app";
import { flattenConnection } from "../utils/shopify";
import CartIcon from "./CartIcon";

export default function CartIconWithItems() {
  //   const itemCount = useCartLinesTotalQuantity();
  const { cart } = useContext(CartContext);

  const itemCount = cart ? cart.totalQuantity : 0; // Get real item count

  const QuantityBadge = ({ itemCount }) => {
    if (itemCount > 0) {
      return (
        <div
          style={{ color: "white" }}
          className="cart-icon__quantity"
          aria-hidden>
          {itemCount}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="cart-icon">
        <CartIcon />
        <QuantityBadge itemCount={itemCount} />
      </div>
      <span className="sr-only">Cart, {itemCount} items</span>
    </>
  );
}
