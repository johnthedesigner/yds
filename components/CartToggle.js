// import {useCartUI} from './CartUIProvider.client';
import CartIconWithItems from "./CartIconWithItems";
import { useCartUI } from "./CartUIProvider";

export default function CartToggle({ type }) {
  const { isCartOpen, toggleCart } = useCartUI();

  return (
    <button
      type="button"
      className={type === "mobile" ? "cart__button--mobile" : "cart__button"}
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={() => {
        toggleCart();
      }}>
      <CartIconWithItems />
      <span className="sr-only">Open cart</span>
    </button>
  );
}
