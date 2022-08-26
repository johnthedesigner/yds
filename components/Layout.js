import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";

export default function Layout({ children, hero }) {
  const storeName = "Yankee Dahlia Society";
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only">
          Skip to content
        </a>
      </div>
      <div>
        <Header storeName={storeName} />
        <div>
          <Cart />
        </div>
        <main role="main" id="mainContent">
          {hero}
          <div className="page__body">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
