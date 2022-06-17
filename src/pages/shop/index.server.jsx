import {Link} from 'react-router-dom';

import Layout from '../../components/Layout.server';
import Bumper from '../../components/Bumper.server';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';
import ProductHighlightRow from '../../components/ProductHighlightRow.server';

// Should we show tools and supplies yet?
const showSupplies = true;

const ShopIndex = ({response}) => {
  response.cache({
    // Cache the page for one hour.
    // maxAge: 60 * 60,
    maxAge: 0,
    // Serve the stale page for up to 23 hours while getting a fresh response in the background.
    // staleWhileRevalidate: 23 * 60 * 60,
    staleWhileRevalidate: 0,
    // cache-control no-cache
    noStore: true,
  });

  return (
    <Layout>
      <NewSeo page={pages.shop} />
      <div className="shop-index">
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <p>The Y.D.S. dahlia shop is open to Y.D.S. Members only.</p>
            <div className="shop-index__button-row">
              <Link to="/membership" className="button">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
        <ProductHighlightRow
          title="Dahlias"
          collection="top-varieties"
          indexPath="/shop/dahlias"
          indexTitle="Shop all Dahlias"
        />
        {showSupplies && (
          <ProductHighlightRow
            title="Tools & Supplies"
            collection="top-supplies"
            indexPath="/shop/supplies"
            indexTitle="Shop all Tools & Supplies"
          />
        )}
      </div>
      <Bumper
        text="Our sales are open to Y.D.S. members, but that's just the beginning of the membership benefits!"
        buttonUrl="/membership"
        buttonLabel="Find out more"
      />
    </Layout>
  );
};

export default ShopIndex;
