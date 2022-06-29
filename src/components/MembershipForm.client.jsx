import {
  AddToCartButton,
  flattenConnection,
  Product,
  useCart,
} from '@shopify/hydrogen/client';
import _ from 'lodash';
import {useEffect, useState} from 'react';

const MembershipForm = ({membershipProduct}) => {
  // TODO: Remove paypal membership state
  const [membershipType, setMembershipType] = useState('individual');
  const [donation, setDonation] = useState(25);
  const [includeDonation, setIncludeDonation] = useState(false);

  // New shopify membership product state
  // TODO: Remove paypal membership state
  const variants = flattenConnection(membershipProduct.variants);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [selectedOptions, setSelectedOptions] = useState(
    variants[0].selectedOptions,
  );

  // Custom add to cart functionality
  const {linesAdd} = useCart();

  const addToCart = async () => {
    const cartUpdate = {
      attributes: [
        {
          key: '',
          value: '',
        },
      ],
      merchandiseId: selectedVariant.id,
      quantity: 1,
    };

    await linesAdd({
      merchandiseId: selectedVariant.id,
    });
  };

  const baseRates = {
    business: 50,
    individual: 35,
  };
  const getBase = () => {
    return baseRates[membershipType];
  };

  const getItemName = () => {
    let itemName = `Membership Type: ${membershipType}, Donation Included: ${includeDonation}`;
    if (includeDonation) {
      itemName += `, Donation Amount: ${donation}`;
    }
    return itemName;
  };

  const getMembershipText = () => {
    if (membershipType == 'individual') {
      return <p>If</p>;
    }
  };

  const dollarize = (value) => `$${1 * value}.00`;

  const Tally = (props) => {
    return <div className="tally">{props.children}</div>;
  };

  const TallyItem = (props) => {
    let figureStyles = {
      textDecoration: props.strikethrough ? 'line-through' : 'none',
      opacity: props.strikethrough ? 0.5 : 1,
    };

    return (
      <p className="tally__item">
        {props.name}:{' '}
        <span className="tally__figure" style={figureStyles}>
          {props.amount}
        </span>
      </p>
    );
  };

  const TallyTotal = (props) => {
    return (
      <p className="tally__total">
        Total: <span className="tally__figure">{props.amount}</span>
      </p>
    );
  };

  // Change Option and trigger downstream updates
  const changeOption = (e) => {
    // Get the new option name and value
    const {name, value} = e.target;

    // Build an up-to-date index of selected options
    const optionIndex = {};
    _.each(selectedOptions, (option) => {
      optionIndex[option.name] = option.value;
    });
    // Update the relevant option
    optionIndex[name] = value;
    // Convert back to array of objects
    let nextOptionArray = _.map(optionIndex, (value, name) => {
      return {name, value};
    });
    console.log(nextOptionArray);

    // Find the right variant to assign based on new options
    let nextVariant;
    _.each(variants, (variant) => {
      if (_.isEqual(variant.selectedOptions, nextOptionArray)) {
        nextVariant = {...variant};
      }
    });
    setSelectedVariant(nextVariant);
    setSelectedOptions(nextVariant.selectedOptions);
  };

  // Build membership form options as dropdowns
  const FormOption = ({name, values, selectedOptions}) => {
    const selectedOption = _.find(selectedOptions, {name: name});
    return (
      <fieldset>
        <label>{name}</label>
        <select
          name={name}
          value={selectedOption.value}
          onChange={changeOption}
        >
          <option value="">Select One</option>
          {_.map(values, (value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </fieldset>
    );
  };

  return (
    <>
      {_.map(membershipProduct.options, (option) => {
        return (
          <FormOption
            key={option.name}
            name={option.name}
            values={option.values}
            selectedOptions={selectedOptions}
          />
        );
      })}
      <Tally>
        <TallyItem
          name="Base Rate"
          amount={dollarize(selectedVariant.priceV2.amount)}
        />
        <TallyItem
          name="Optional Donation"
          strikethrough={!includeDonation}
          amount={dollarize(donation)}
        />
        <TallyTotal
          amount={dollarize(
            includeDonation
              ? donation + selectedVariant.priceV2.amount
              : selectedVariant.priceV2.amount,
          )}
        />
      </Tally>
      <button className="button" onClick={addToCart}>
        Custom Add Button
      </button>
    </>
  );
};

export default MembershipForm;
