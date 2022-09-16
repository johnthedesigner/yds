// import {flattenConnection, useCart} from '@shopify/hydrogen/client';
import _ from "lodash";
import { useContext, useState } from "react";

import { flattenConnection } from "../utils/shopify";
import { CartContext } from "../pages/_app";

const FundraiserForm = ({ fundraiserProduct }) => {
  const { addToCart } = useContext(CartContext);

  // Included fundraiser donation state
  const donationVariants = flattenConnection(fundraiserProduct.variants);
  // Start with second option by default ($25)
  const [donationVariant, setDonationVariant] = useState(donationVariants[2]);
  const [donationOptions, setDonationOptions] = useState(
    donationVariant.selectedOptions
  );

  const handleAddToCart = async () => {
    let newLines = [
      {
        merchandiseId: donationVariant.id,
        quantity: 1,
      },
    ];

    addToCart(newLines);
  };

  const dollarize = (value) => `$${(1 * value).toFixed(2)}`;

  const getNextVariant = (variants, selectedVariant, name, value) => {
    // Build an up-to-date index of selected options
    const optionIndex = {};
    _.each(selectedVariant.selectedOptions, (option) => {
      optionIndex[option.name] = option.value;
    });

    // Update the relevant option
    optionIndex[name] = value;

    // Convert back to array of objects
    let nextOptionArray = _.map(optionIndex, (value, name) => {
      return { name, value };
    });

    // Find the right variant to assign based on new options
    let nextVariant;
    _.each(variants, (variant) => {
      if (_.isEqual(variant.selectedOptions, nextOptionArray)) {
        nextVariant = { ...variant };
      }
    });

    return nextVariant;
  };

  // Change Dontion Option and trigger downstream updates
  const changeDonationOption = (e) => {
    // Get the new option name and value
    let { name, value } = e.target;

    let nextVariant = getNextVariant(
      donationVariants,
      donationVariant,
      name,
      value
    );

    setDonationVariant(nextVariant);
    setDonationOptions(nextVariant.selectedOptions);
  };

  // Build membership form options as dropdowns
  const DonationOption = ({ name, values }) => {
    let selectedOption = _.find(donationOptions, { name });
    return (
      <>
        <fieldset style={{ marginBottom: "2rem" }}>
          <select
            name={name}
            value={selectedOption.value}
            onChange={changeDonationOption}>
            {_.map(values, (value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </fieldset>
      </>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        gridAutoRows: "minmax(3rem, auto",
      }}>
      <div className="form-block__large" style={{ marginTop: "2rem" }}>
        {_.map(fundraiserProduct.options, (option) => {
          return (
            <DonationOption
              key={option.name}
              name={option.name}
              values={option.values}
            />
          );
        })}
      </div>
      <div className="form-block__large">
        <div style={{ textAlign: "right" }}>
          <button className="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <p style={{ margin: "1rem .5rem", fontSize: "1.25rem" }}>
          <small>
            <em>
              Yankee Dahlia Society Inc. is a federally registered 501(c)(3) non
              profit organization, and your donation may be tax deductible.
            </em>
          </small>
        </p>
      </div>
    </div>
  );
};

export default FundraiserForm;
