import {Helmet} from '@shopify/hydrogen/client';
// import {Helmet} from 'react-helmet';

import shopifyConfig from '../../shopify.config';
const {siteDomain} = shopifyConfig;

export default function NewSeo({shopName, product, page}) {
  if (product) {
    const variant = product.variants.edges[0].node;
    const price = variant.priceV2;
    const image = product.images.edges[0]?.node;
    const productName = product.seo?.title ?? product.title;
    const description = product.seo?.description ?? product.description;
    const title = productName;

    /* TODO: Find a way to get the full URL */
    // const url = typeof window === 'undefined' ? '' : window.location.href;
    let url = `${siteDomain}/shop/products/${product.handle}`;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="product" />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image.url} />}
        {image && <meta property="og:image:secure_url" content={image.url} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    );
  }

  if (page) {
    let {title, description, path} = page;
    let url = siteDomain + path;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />

        {/* {image && <meta property="og:image" content={image.url} />}
          {image && <meta property="og:image:secure_url" content={image.url} />} */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    );
  }

  /**
   * Return a global SEO helper if no other props were passed.
   * Useful for placing in the "main" <App> container.
   */
  return (
    <Helmet defaultTitle={shopName} titleTemplate={`%s - ${shopName}`}>
      <html lang="en" />
      <meta property="og:site_name" content={shopName} />
    </Helmet>
  );
}
