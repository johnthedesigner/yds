# Yankeed Dahlia Society Website

The yankeedahliasociety.com website is built with the Hydrogen framework from Shopify, with a whole bunch of customizations for member login, content management and so on...

[Check out the Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)

## Getting started

**Requirements:**

- Node v14+
- Yarn

```bash
yarn
yarn dev
```

Remember to update `shopify.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
yarn build
```

Then, you can run a local `server.js` using the production build with:

```bash
yarn serve
```

## Configuring the dev environment

In order to successfully build the website locally a set of variables need to be configured in a `.env` file. There is a `.env.exmple` file that lists out all of the necessary variables with placeholder values.

## Configuring the server environment (staging & production)

In order to successfully build and serve the website (using Heroku) a set of environment variables need to be configured. They can be configured in the settings page for a given environment in Heroku using the same values from the dev setup above.

## Deploying the Website

Use this link to get Heroku git deployment set up:

[Heroku Dev Center - Deploying with Git](https://devcenter.heroku.com/articles/git)

My current heroku remotes are named `heroku` for the production environment and `heroku-staging` for the staging environment.

Generally it is best to push to the staging or production environments from the main branch.

```bash
git push heroku main
```

```bash
git push heroku-staging main
```

In some cases it makes sense to push from an unmerged branch into the staging environment for testing. When doing this, or on the next push from the main branch afterward it may be necessary to do a force push.

```bash
git push heroku-staging main:example-branch --force
```
