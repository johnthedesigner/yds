import _ from "lodash";
import axios from "axios";

// import { getSitemapProducts } from "../utils/shopify";
import { flattenConnection } from "../utils/shopify";
import pages from "../utils/pages";

const getDate = new Date().toISOString();

const Sitemap = () => {
  return null;
};

const shopSitemap = (products, siteDomain, protocol) => {
  const staticPages = _.map(pages, (page) => {
    if (page.inSitemap) {
      return `
            <url>
              <loc>${protocol}://${siteDomain}${page.path}</loc>
              <lastmod>${getDate}</lastmod>
            </url>
          `;
    } else {
      return null;
    }
  }).join("");

  const imageInfo = (product) => {
    let image = product.images.edges[0];
    if (image) {
      return `
          <image:image>
          <image:loc>
            ${image.node.url}
          </image:loc>
          <image:title>
            ${image.node.altText ?? ""}
          </image:title>
          <image:caption />
        </image:image>
      `;
    } else return "";
  };

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${staticPages}
      ${products
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
        .join("")}
    </urlset>`;
};

export const getServerSideProps = async ({ res }) => {
  const { DOMAIN, PROTOCOL } = process.env;
  // Fetch products
  let products = [];

  await axios({
    method: "get",
    url: `http://${DOMAIN}/api/get-sitemap-products`,
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let { data } = response;
    if (data.errors) {
      // TODO: handle these errors
    } else {
      // Get cart from response and update in-app
      products = flattenConnection(data);
    }
  });

  let sitemap = shopSitemap(products, DOMAIN, PROTOCOL);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
