import {
  useCartLinesTotalQuantity,
  CartCheckoutButton,
  Link,
  CartLines,
  CartLine,
  CartEstimatedCost,
  useCart,
} from '@shopify/hydrogen/client';
import {Dialog} from '@headlessui/react';

import {useCartUI} from './CartUIProvider.client';
import CartIconWithItems from './CartIconWithItems.client';
import {BUTTON_PRIMARY_CLASSES} from './Button.client';
import _ from 'lodash';
import {check} from 'prettier';
import {useState} from 'react';

export default function Cart() {
  const {isCartOpen, closeCart} = useCartUI();
  const itemCount = useCartLinesTotalQuantity();

  return (
    <Dialog open={isCartOpen} onClose={closeCart}>
      <Dialog.Overlay className="fixed z-20 inset-0 bg-gray-50 opacity-75" />
      <div
        className={`cart__dialog--empty absolute flex flex-col md:block z-20 top-0 left-0 right-0 bottom-0 md:top-7 h-full md:left-auto md:right-7 md:bottom-auto md:h-auto md:max-h-[calc(100vh-56px)] bg-gray-50 w-full md:w-[470px] rounded-b-lg shadow-2xl ${
          itemCount === 0 ? 'overflow-hidden' : 'overflow-y-scroll'
        }`}
      >
        <CartHeader />
        {itemCount === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <CartItems />
            {/* <CartFooter /> */}
          </>
        )}
      </div>
    </Dialog>
  );
}

function CartHeader() {
  const {closeCart} = useCartUI();

  const cartHeaderStyles = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #DDD',
  };

  return (
    <header style={cartHeaderStyles}>
      <div>
        <button type="button" onClick={closeCart}>
          <ArrowIcon />
          <span className="sr-only">Close cart</span>
        </button>
      </div>
      <div style={{flex: 1, textAlign: 'center'}}>
        <span>Shopping Cart</span>
      </div>
      <CartIconWithItems />
    </header>
  );
}

const renderPrice = (amount, quantity) => {
  return `$${(1 * quantity * amount).toFixed(2)}`;
};

const CartItem = ({line}) => {
  const {linesRemove, linesUpdate} = useCart();

  const infoStyles = {
    padding: '1rem',
  };
  const titleStyles = {
    color: '#c65a60',
    fontSize: '1.25rem',
  };
  const priceStyles = {
    padding: '1rem',
    textAlign: 'right',
  };
  const detailStyles = {
    fontSize: '1rem',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: 1.5,
  };
  const quantityBlockStyles = {
    display: 'inline-block',
    border: '1px solid #DDD',
    borderRadius: '.5rem',
    padding: '0.5rem',
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  };
  const quantityButtonStyles = {
    lineHeight: 1,
    margin: '0 0.5rem',
    verticalAlign: 'bottom',
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
            style={quantityButtonStyles}
            onClick={() => {
              linesUpdate([{id: line.id, quantity: line.quantity - 1}]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {line.quantity}
          <button
            style={quantityButtonStyles}
            onClick={() => {
              linesUpdate([{id: line.id, quantity: line.quantity + 1}]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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
            linesRemove([line.id]);
          }}
          style={{padding: '1rem'}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#3d4549"
          >
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
  const {lines, cost, checkoutUrl} = useCart();
  console.log(lines, cost);

  const [hovered, setHovered] = useState(false);

  const listStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 100px max-content',
  };
  const checkoutButtonStyles = {
    display: 'block',
    width: 'calc(100% - 1rem)',
    background: hovered ? '#DE7278' : '#C65A60',
    margin: '.5rem',
    padding: '0.5rem',
    borderRadius: '.25rem',
    color: 'white',
    transition: 'all linear .1s',
  };

  var cartTotal = 0;
  _.each(lines, (line) => {
    cartTotal += 1 * line.quantity * line.merchandise.priceV2.amount;
  });
  console.log(cartTotal);

  if (lines.length > 0) {
    return (
      <>
        <div style={listStyles}>
          {_.map(lines, (line) => {
            return <CartItem key={line.id} line={line} />;
          })}
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid #DDD',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            Total:
          </div>
          <div
            style={{
              textAlign: 'right',
              padding: '1rem',
              borderTop: '1px solid #DDD',
              fontWeight: 'bold',
            }}
          >
            {renderPrice(cartTotal, 1)}
          </div>
          <div style={{borderTop: '1px solid #DDD'}} />
        </div>
        <div>
          <button
            style={checkoutButtonStyles}
            onClick={() => {
              window.location.href = checkoutUrl;
            }}
            onMouseOver={() => setHovered(true)}
            onFocus={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onBlur={() => setHovered(false)}
          >
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

// function CartItems() {
//   return (
//     <div className="px-7 flex-grow" role="table" aria-label="Shopping cart">
//       <div role="row" className="sr-only">
//         <div role="columnheader">Product image</div>
//         <div role="columnheader">Product details</div>
//         <div role="columnheader">Price</div>
//       </div>
//       <CartLines>
//         {({merchandise}) => (
//           <div
//             role="row"
//             className="flex py-7 border-b last:border-b-0 border-gray-300 text-gray-900"
//           >
//             <div role="cell" className="flex-shrink-0 mr-7">
//               <Link to={`products/${merchandise.product.handle}`}>
//                 <CartLine.Image
//                   className="bg-white border border-black border-opacity-5 rounded-xl "
//                   options={{width: 98, height: 98, crop: 'center'}}
//                 />
//               </Link>
//             </div>
//             <div
//               role="cell"
//               className="flex flex-col w-full justify-between items-start flex-grow-1 mr-4"
//             >
//               <Link
//                 to={`products/${merchandise.product.handle}`}
//                 className="hover:underline"
//               >
//                 <CartLine.ProductTitle className="text-lg font-medium" />
//               </Link>
//               <CartLine.SelectedOptions as="ul" className="text-xs space-y-1">
//                 {({name, value}) => (
//                   <>
//                     {name}: {value}
//                   </>
//                 )}
//               </CartLine.SelectedOptions>
//               <CartLine.Attributes as="ul" className="text-sm space-y-1">
//                 {({key, value}) => (
//                   <>
//                     {key}: {value}
//                   </>
//                 )}
//               </CartLine.Attributes>
//               <CartItemQuantity />
//             </div>
//             <div
//               role="cell"
//               className="flex flex-col justify-between items-end"
//             >
//               <CartLine.QuantityAdjustButton
//                 adjust="remove"
//                 aria-label="Remove from cart"
//                 className="disabled:pointer-events-all disabled:cursor-wait"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </CartLine.QuantityAdjustButton>
//               <CartLine.Price className="text-lg" />
//             </div>
//           </div>
//         )}
//       </CartLines>
//     </div>
//   );
// }

// function CartItemQuantity() {
//   return (
//     <div className="flex border rounded border-gray-300 items-center overflow-auto mt-2">
//       <CartLine.QuantityAdjustButton
//         adjust="decrease"
//         aria-label="Decrease quantity"
//         className="p-2 disabled:pointer-events-all disabled:cursor-wait"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-gray-400"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </CartLine.QuantityAdjustButton>
//       <CartLine.Quantity
//         as="div"
//         className="p-2 text-gray-900 text-xs text-center"
//       />
//       <CartLine.QuantityAdjustButton
//         adjust="increase"
//         aria-label="Increase quantity"
//         className="p-2 text-gray-400 disabled:pointer-events-all disabled:cursor-wait"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </CartLine.QuantityAdjustButton>
//     </div>
//   );
// }

function CartFooter() {
  return (
    <footer className="bottom-0 sticky pb-8 border-t border-black border-opacity-5">
      <div className="relative h-60 bg-white text-gray-900 p-7">
        <div role="table" aria-label="Cost summary">
          <div role="row" className="flex justify-between">
            <span className="font-semibold" role="rowheader">
              Subtotal
            </span>
            <CartEstimatedCost
              amountType="subtotal"
              role="cell"
              className="text-right "
            />
          </div>
        </div>
        {/* <CartShopPayButton className="flex my-4 justify-center w-full bg-[#5a31f4] py-2 rounded-md" /> */}
        <CartCheckoutButton className={BUTTON_PRIMARY_CLASSES}>
          Checkout
        </CartCheckoutButton>
      </div>
    </footer>
  );
}

function CartEmpty() {
  const {closeCart} = useCartUI();
  return (
    <div className="p-7 flex flex-col">
      <p className="mb-4 text-lg text-gray-500 text-center">
        Your cart is empty
      </p>
      <button
        type="button"
        onClick={closeCart}
        className={BUTTON_PRIMARY_CLASSES}
      >
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
      xmlns="http://www.w3.org/2000/svg"
    >
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
