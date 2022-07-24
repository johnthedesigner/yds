import {Link} from '@shopify/hydrogen/client';

export default function LoadingFallback() {
  return (
    <>
      <header role="banner" className="header">
        <div>
          <Link
            className="logo-link--desktop"
            to="/"
            title="Yankee Dahlia Society"
          >
            <img className="logo--desktop" src="/logo-desktop.svg" />
          </Link>
          <div className="navbar--desktop"></div>
        </div>
      </header>
    </>
  );
}
