import { SessionProvider } from "next-auth/react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import Script from "next/script";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";

import "../styles/globals.css";
import "../styles/new-globals.css";
import "../styles/header.css";

import CartUIProvider, { useCartUI } from "../components/CartUIProvider";
export const CartContext = createContext({
  cart: null,
  setCart: () => {},
  getCart: () => {},
  addToCart: () => {},
  cartLineRemove: () => {},
  cartLinesUpdate: () => {},
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // State mangement for our shopping cart
  const [cart, setCart] = useState(null);

  // const { openCart } = useCartUI();

  // Capture pageviews and events in google analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Cart Management Functions
  const addToCart = useCallback(
    async (lines, attributes) => {
      let data = {
        cart,
        lines,
      };
      if (attributes) {
        data.attributes = attributes;
      }
      await axios({
        method: "post",
        url: "/api/add-to-cart",
        data,
        headers: { "content-type": "application/json" },
      }).then((response) => {
        let { data } = response;
        if (data && data.errors) {
          // TODO: handle these errors
        } else {
          // Get cart from response and update in-app
          setCart(data.cart);
          // openCart();
        }
      });
    },
    [cart]
  );

  const cartLinesUpdate = useCallback(
    async (lines) => {
      let data = {
        cart,
        lines,
      };
      await axios({
        method: "post",
        url: "/api/cart-lines-update",
        data,
        headers: { "content-type": "application/json" },
      }).then((response) => {
        let { data } = response;
        if (data && data.errors) {
          // TODO: handle these errors
        } else {
          // Get cart from response and update in-app
          setCart(data);
        }
      });
    },
    [cart]
  );

  const cartLineRemove = useCallback(
    async (lineId) => {
      let data = {
        cart,
        lineId,
      };
      await axios({
        method: "post",
        url: "/api/cart-line-remove",
        data,
        headers: { "content-type": "application/json" },
      }).then((response) => {
        let { data } = response;
        if (data && data.errors) {
          // TODO: handle these errors
        } else {
          // Get cart from response and update in-app
          setCart(data);
        }
      });
    },
    [cart]
  );

  const getCart = async (id) => {
    await axios({
      method: "post",
      url: "/api/get-cart",
      data: { id },
      headers: { "content-type": "application/json" },
    }).then((response) => {
      let { data } = response;
      if (data && data.errors) {
        // TODO: handle these errors
      } else {
        // Get cart from response and update in-app
        setCart(data);
      }
    });
  };

  // Build value for our cart provider with cart update method
  const cartValue = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
      getCart,
      cartLinesUpdate,
      cartLineRemove,
    }),
    [cart, addToCart, cartLineRemove, cartLinesUpdate]
  );

  // Persist cart in local storage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("ydsCart"))) {
      //checking if there already is a cart in localstorage
      //if yes, update the current cart with the stored one
      let storedCart = JSON.parse(localStorage.getItem("ydsCart"));
      setCart(storedCart);
      getCart(storedCart.id);
    }
  }, []);

  useEffect(() => {
    // console.log("cart changed set localstorage");
    localStorage.setItem("ydsCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YQPD41DH63"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQPD41DH63', {
            page_path: window.location.pathname,
            });
            `,
        }}
      />
      <SessionProvider session={session}>
        <CartContext.Provider value={cartValue}>
          <CartUIProvider>
            <Component {...pageProps} />
          </CartUIProvider>
        </CartContext.Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
