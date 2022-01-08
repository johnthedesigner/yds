import _ from 'lodash';
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

const ShopIndexBody = () => {
  const {isAuthenticated, isLoading, user, getIdTokenClaims} = useAuth0();
  const roles = user ? user['https:yankeedahliasociety.com/roles'] : [];
  console.log(user, roles);
  const isEarlyAccessMember = _.includes(roles, 'Early Access');

  return (
    <>
      <div className="shop-index__header">
        {false && (
          <h3 className="shop-index__products-link">
            <Link to="/shop/products">Browse All Products</Link>
          </h3>
        )}
      </div>
    </>
  );
};

export default ShopIndexBody;
