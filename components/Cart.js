// import {useCartLinesTotalQuantity, useCart} from '@shopify/hydrogen/client';
import _ from "lodash";
import { Dialog } from "@headlessui/react";
import { useContext, useState } from "react";

import { CartContext } from "../pages/_app";
import { useCartUI } from "./CartUIProvider";
import CartIconWithItems from "./CartIconWithItems";
import { flattenConnection } from "../utils/shopify";
import cartLineUpdate from "../pages/api/cart-lines-update";
// import { BUTTON_PRIMARY_CLASSES } from "./Button";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const itemCount = cart ? cart.totalQuantity : 0;
  const { isCartOpen, closeCart } = useCartUI();

  return (
    <>
      {isCartOpen && <div className="cart__overlay" onClick={closeCart} />}
      {isCartOpen && (
        <div className="cart">
          <CartHeader />
          <div className="cart__body">
            {itemCount > 0 ? <CartItems /> : <CartEmpty />}
          </div>
          {/* <CartFooter /> */}
        </div>
      )}
    </>
  );
}

function CartHeader() {
  const { closeCart, toggleCart } = useCartUI();

  const cartHeaderStyles = {
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #DDD",
    background: "white",
    position: "sticky",
    top: 0,
  };

  return (
    <header style={cartHeaderStyles}>
      <div>
        <button
          type="button"
          className="cart__close-button"
          onClick={closeCart}>
          <ArrowIcon />
          <span className="sr-only">Close cart</span>
        </button>
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <span>Shopping Cart</span>
      </div>
      <button
        style={{ background: "none", border: "none" }}
        onClick={toggleCart}>
        <CartIconWithItems />
      </button>
    </header>
  );
}

const renderPrice = (amount, quantity) => {
  return `$${(1 * quantity * amount).toFixed(2)}`;
};

const CartItem = ({ line }) => {
  const { cartLinesUpdate, cartLineRemove } = useContext(CartContext);

  const infoStyles = {
    padding: "1rem",
  };
  const titleStyles = {
    color: "#c65a60",
    fontSize: "1.25rem",
  };
  const priceStyles = {
    padding: "1rem",
    textAlign: "right",
  };
  const detailStyles = {
    fontSize: "1rem",
    fontStyle: "italic",
    margin: 0,
    lineHeight: 1.5,
  };
  const quantityBlockStyles = {
    display: "inline-block",
    border: "1px solid #DDD",
    borderRadius: ".5rem",
    padding: "0.5rem",
    marginTop: "0.5rem",
    fontSize: "0.75rem",
    fontWeight: "bold",
  };
  const quantityButtonStyles = {
    lineHeight: 1,
    margin: "0 0.5rem",
    verticalAlign: "middle",
  };

  const iconButtonStyles = {
    border: "none",
    background: "none",
  };

  return (
    <>
      <div style={infoStyles}>
        <div style={titleStyles}>{line.merchandise.product.title}</div>
        {_.map(line.merchandise.selectedOptions, (option) => {
          return (
            <p key={option.name} style={detailStyles}>
              <b>{option.name}:</b> {option.value}
            </p>
          );
        })}
        {_.map(line.attributes, (attribute) => {
          return (
            <p key={attribute.key} style={detailStyles}>
              <b>{attribute.key}:</b> {attribute.value}
            </p>
          );
        })}
        <div style={quantityBlockStyles}>
          <button
            style={{ ...iconButtonStyles, ...quantityButtonStyles }}
            onClick={() => {
              cartLinesUpdate([{ id: line.id, quantity: line.quantity - 1 }]);
            }}
            disabled={line.quantity === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ width: "1rem" }}>
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {line.quantity}
          <button
            style={{ ...iconButtonStyles, ...quantityButtonStyles }}
            onClick={() => {
              cartLinesUpdate([{ id: line.id, quantity: line.quantity + 1 }]);
            }}
            disabled={line.quantity >= line.merchandise.product.totalInventory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ width: "1rem" }}>
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div style={priceStyles}>
        {renderPrice(line.merchandise.priceV2.amount, line.quantity)}
      </div>
      <div>
        <button
          onClick={() => {
            cartLineRemove(line.id);
          }}
          style={{ ...iconButtonStyles, padding: "1rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#3d4549"
            style={{ width: "1rem" }}>
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

const CartItems = () => {
  const { cart } = useContext(CartContext);
  const cartLines = flattenConnection(cart.lines);

  const [hovered, setHovered] = useState(false);

  const listStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 100px max-content",
  };
  const checkoutButtonStyles = {
    display: "block",
    width: "calc(100% - 1rem)",
    background: hovered ? "#DE7278" : "#C65A60",
    margin: "0 0.5rem",
    padding: "0.5rem",
    border: "none",
    borderRadius: ".25rem",
    color: "white",
    transition: "all linear .1s",
  };

  var cartTotal = 0;
  _.each(cartLines, (line) => {
    cartTotal += 1 * line.quantity * line.merchandise.priceV2.amount;
  });

  if (cartLines.length > 0) {
    return (
      <>
        <div style={listStyles}>
          {_.map(cartLines, (line) => {
            return <CartItem key={line.id} line={line} />;
          })}
        </div>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "white",
            paddingBottom: "0.5rem",
          }}>
          <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                padding: "1rem",
                borderTop: "1px solid #DDD",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}>
              Total:
            </div>
            <div
              style={{
                textAlign: "right",
                padding: "1rem",
                borderTop: "1px solid #DDD",
                fontWeight: "bold",
              }}>
              {renderPrice(cartTotal, 1)}
            </div>
          </div>
          <button
            className="button"
            style={checkoutButtonStyles}
            onClick={() => {
              window.location.href = cart.checkoutUrl;
            }}
            onMouseOver={() => setHovered(true)}
            onFocus={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onBlur={() => setHovered(false)}>
            Checkout
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CartEmpty />
      </>
    );
  }
};

function CartEmpty() {
  const { closeCart } = useCartUI();
  return (
    <div className="cart__body--empty">
      <p>Your cart is empty</p>
      <button type="button" className="button" onClick={closeCart}>
        Continue Shopping
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 1.5L19 8.5M19 8.5L12 15.5M19 8.5L1 8.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
