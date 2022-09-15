const cartQuery = `
  {
    id
    createdAt
    updatedAt
    totalQuantity
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
              }
              product {
                title
                totalInventory
              }
            }
          }
          attributes {
            key
            value
          }
          quantity
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
    }
  }
`;

export default cartQuery;
