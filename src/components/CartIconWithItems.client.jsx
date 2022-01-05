import {useCartLinesTotalQuantity} from '@shopify/hydrogen/client';

import CartIcon from './CartIcon';

export default function CartIconWithItems() {
  const itemCount = useCartLinesTotalQuantity();
  const quantityStyle = {
    display: itemCount === 0 ? 'none' : 'block',
  };

  return (
    <>
      <div className="cart-icon">
        <CartIcon />

        <div className="cart-icon__quantity" style={quantityStyle} aria-hidden>
          {itemCount > 0 ? itemCount : null}
        </div>
      </div>
      <span className="sr-only">Cart, {itemCount} items</span>
    </>
  );
}
