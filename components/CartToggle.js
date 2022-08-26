// import {useCartUI} from './CartUIProvider.client';
import CartIconWithItems from "./CartIconWithItems";

export default function CartToggle() {
  //   const cartUI = useCartUI();

  //   if (cartUI == null) {
  //     throw new Error('CartToggle must be a descendent of a CartUIProvider');
  //   }

  //   const {isCartOpen, toggleCart} = cartUI;

  return (
    <button
      type="button"
      aria-expanded={false} // Add real cart open logic here
      aria-controls="cart"
      onClick={() => {
        // toggleCart(); // Add real cart open logic here
      }}>
      <CartIconWithItems />
      <span className="sr-only">Open cart</span>
    </button>
  );
}
