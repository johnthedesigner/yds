import {useCartLinesTotalQuantity} from '@shopify/hydrogen/client';

import CartIcon from './CartIcon';

export default function CartIconWithItems() {
  const itemCount = useCartLinesTotalQuantity();

  const QuantityBadge = ({itemCount}) => {
    if (itemCount > 0) {
      return (
        <div
          style={{color: 'white'}}
          className="cart-icon__quantity"
          aria-hidden
        >
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
