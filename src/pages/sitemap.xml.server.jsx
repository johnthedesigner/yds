import _ from 'lodash';
import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import pages from '../pages';
import ShopifyConfig from '../../shopify.config';

const {siteDomain} = ShopifyConfig;
const getDate = new Date().toISOString();

export default function Sitemap({response}) {
  response.doNotStream();

  const {data} = useShopQuery({query: QUERY});

  response.headers.set('content-type', 'application/xml');

  return response.send(shopSitemap(data));
}

const staticPages = _.map(pages, (page) => {
  if (page.inSitemap) {
    return `
      <url>
        <loc>${siteDomain}${page.path}</loc>
        <lastmod>${getDate}</lastmod>
      </url>
    `;
  } else {
    return null;
  }
}).join('');

const imageInfo = (product) => {
  let image = product.images.edges[0];
  if (image) {
    return `
    <image:image>
    <image:loc>
      ${image.node.url}
    </image:loc>
    <image:title>
      ${image.node.altText ?? ''}
    </image:title>
    <image:caption />
  </image:image>
`;
  } else return '';
};

function shopSitemap(data) {
  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${staticPages}
      ${flattenConnection(data.products)
        .map((product) => {
          return `
          <url>
            <loc>
            ${siteDomain}/shop/products/${product.handle}
            </loc>
            <lastmod>${product.updatedAt}</lastmod>
            <changefreq>daily</changefreq>
            ${imageInfo(product)}
          </url>
        `;
        })
        .join('')}
    </urlset>`;
}

const QUERY = gql`
  query Products {
    products(first: 100) {
      edges {
        node {
          updatedAt
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
