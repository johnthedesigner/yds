import Header from './Header.client';
import Footer from './Footer.server';
import Cart from './Cart.client';

export default function Layout({children, hero, isCommercePage}) {
  const storeName = 'Yankee Dahlia Society';
  return (
    <>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div>
        <Header storeName={storeName} />
        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
        <div>
          <Cart />
        </div>
        <main role="main" id="mainContent">
          {hero}
          {/* <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8"> */}
          <div className="page__body">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
