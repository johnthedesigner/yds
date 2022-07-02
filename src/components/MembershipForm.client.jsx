import {flattenConnection, useCart} from '@shopify/hydrogen/client';
import _ from 'lodash';
import {useEffect, useRef, useState} from 'react';

const MembershipForm = ({
  ydsMembershipProduct,
  adsMembershipProduct,
  donationProduct,
}) => {
  // YDS membership product state
  const ydsMembershipVariants = flattenConnection(
    ydsMembershipProduct.variants,
  );
  const [ydsMembershipVariant, setYdsMembershipVariant] = useState(
    ydsMembershipVariants[0],
  );
  const [ydsMembershipOptions, setYdsMembershipOptions] = useState(
    ydsMembershipVariants[0].selectedOptions,
  );

  // // ADS Membership product state
  const [includeAdsMembership, setIncludeAdsMembership] = useState(false);
  const adsMembershipVariants = flattenConnection(
    adsMembershipProduct.variants,
  );
  const [adsMembershipVariant, setAdsMembershipVariant] = useState(
    adsMembershipVariants[0],
  );
  const [adsMembershipOptions, setAdsMembershipOptions] = useState(
    adsMembershipVariants[0].selectedOptions,
  );

  // Included donation state
  const [includeDonation, setIncludeDonation] = useState(false);
  const donationVariants = flattenConnection(donationProduct.variants);
  // Start with second option by default ($25)
  const [donationVariant, setDonationVariant] = useState(donationVariants[2]);
  const [donationOptions, setDonationOptions] = useState(
    donationVariant.selectedOptions,
  );

  // Member Info Data state
  const [memberInfo, setMemberInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Member Info Validation state
  const [memberInfoValidation, setMemberInfoValidation] = useState({
    fullName: true,
    email: true,
    address: true,
    city: true,
    state: true,
    zip: true,
  });

  // Member Info Field Refs
  const memberInfoRefs = {
    fullName: useRef(null),
    email: useRef(null),
    address: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip: useRef(null),
  };

  // Member Info Validation
  const memberInfoValidators = {
    fullName: (value) => {
      return value != '';
    },
    email: (value) => {
      let emailCheck =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return value.match(emailCheck);
    },
    address: (value) => {
      return value != '';
    },
    city: (value) => {
      return value != '';
    },
    state: (value) => {
      return value != '';
    },
    zip: (value) => {
      return value != '';
    },
  };
  // Update individual member info fields
  const updateMemberInfo = (name, value) => {
    let newMemberInfo = {...memberInfo};
    newMemberInfo[name] = value;
    setMemberInfo(newMemberInfo);
  };

  // Total cost tally state
  const [tallyTotal, setTallyTotal] = useState(0);
  useEffect(() => {
    let ydsAmount = 1 * ydsMembershipVariant.priceV2.amount;
    let donationAmount = includeDonation
      ? 1 * donationVariant.priceV2.amount
      : 0;
    let adsAmount = includeAdsMembership
      ? 1 * adsMembershipVariant.priceV2.amount
      : 0;
    let total = ydsAmount + donationAmount + adsAmount;
    setTallyTotal(total);
  }, [
    ydsMembershipOptions,
    includeDonation,
    donationOptions,
    includeAdsMembership,
  ]);

  // Custom add to cart functionality
  const {linesAdd} = useCart();

  const addToCart = async () => {
    // Start with true validation status
    let valid = true;
    let nextValidationState = {
      ...memberInfoValidation,
    };

    // Get the names of all our fields
    let fieldNames = _.keys(memberInfo);

    // Check validation rules for each field and mark dirty fields
    await _.each(fieldNames, (name) => {
      if (!memberInfoValidators[name](memberInfo[name])) {
        // Prevent submission
        valid = false;
        // Mark individual field
        nextValidationState[name] = false;
      }
    });
    setMemberInfoValidation(nextValidationState);

    if (valid) {
      let attributes = _.map(memberInfo, (value, key) => {
        return {key, value};
      });
      let newLines = [
        {
          merchandiseId: ydsMembershipVariant.id,
          attributes,
        },
      ];
      if (includeAdsMembership) {
        newLines.push({
          merchandiseId: adsMembershipVariant.id,
        });
      }
      if (includeDonation) {
        newLines.push({
          merchandiseId: donationVariant.id,
        });
      }
      await linesAdd(newLines);
    }
  };

  const dollarize = (value) => `$${(1 * value).toFixed(2)}`;

  const Tally = ({amounts}) => {
    return (
      <>
        {_.map(amounts, (item, index) => {
          return (
            <p key={index} className="tally__item">
              {item.label}:{' '}
              <span
                className="tally__figure"
                style={{
                  textDecoration: !item.include ? 'line-through' : 'none',
                  opacity: !item.include ? 0.5 : 1,
                }}
              >
                {dollarize(1 * item.price)}
              </span>
            </p>
          );
        })}
        <p className="tally__total">
          Total: <span className="tally__figure">{dollarize(tallyTotal)}</span>
        </p>
      </>
    );
  };

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
      return {name, value};
    });

    // Find the right variant to assign based on new options
    let nextVariant;
    _.each(variants, (variant) => {
      if (_.isEqual(variant.selectedOptions, nextOptionArray)) {
        nextVariant = {...variant};
      }
    });

    return nextVariant;
  };

  // Change Membership Option and trigger downstream updates
  const changeMembershipOption = (e) => {
    // Get the new option name and value
    const {name, value} = e.target;

    let nextVariant = getNextVariant(
      ydsMembershipVariants,
      ydsMembershipVariant,
      name,
      value,
    );

    setYdsMembershipVariant(nextVariant);
    setYdsMembershipOptions(nextVariant.selectedOptions);
  };

  // Change Dontion Option and trigger downstream updates
  const changeDonationOption = (e) => {
    // Get the new option name and value
    const {name, value} = e.target;

    let nextVariant = getNextVariant(
      donationVariants,
      donationVariant,
      name,
      value,
    );

    setDonationVariant(nextVariant);
    setDonationOptions(nextVariant.selectedOptions);
  };

  // Build membership form options as dropdowns
  const MembershipOption = ({name, values}) => {
    let selectedOption = _.find(ydsMembershipOptions, {name: name});
    return (
      <fieldset style={{marginBottom: '1rem'}}>
        <label>{name}</label>
        {_.map(values, (value, index) => {
          let idString =
            name.replace(/\W/g, '_') + '_' + value.replace(/\W/g, '_');
          let candidateVariant = getNextVariant(
            ydsMembershipVariants,
            ydsMembershipVariant,
            name,
            value,
          );
          return (
            <fieldset key={index}>
              <label htmlFor={`radio_${idString}`} className="inline-label">
                <input
                  id={`radio_${idString}`}
                  type="radio"
                  key={value}
                  name={name}
                  value={value}
                  checked={selectedOption.value === value}
                  onChange={changeMembershipOption}
                />
                {value} – {dollarize(candidateVariant.priceV2.amount)}
              </label>
            </fieldset>
          );
        })}
      </fieldset>
    );
  };

  // Build membership form options as dropdowns
  const DonationOption = ({name, values}) => {
    let selectedOption = _.find(donationOptions, {name: name});
    return (
      <fieldset style={{marginBottom: '2rem'}}>
        <label>
          <input
            type="checkbox"
            checked={includeDonation}
            onChange={(e) => {
              setIncludeDonation(!includeDonation);
            }}
          />
          Include Donation
        </label>
        <select
          name={name}
          value={selectedOption.value}
          onChange={changeDonationOption}
          disabled={!includeDonation}
        >
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

  const RequiredMark = () => <span style={{color: '#c65a60'}}>*</span>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        gridAutoRows: 'minmax(3rem, auto',
      }}
    >
      <div
        style={{
          gridColumn: '1 / 5',
        }}
      >
        {_.map(ydsMembershipProduct.options, (option) => {
          return (
            <MembershipOption
              key={option.name}
              name={option.name}
              values={option.values}
            />
          );
        })}
      </div>
      <fieldset
        style={{
          gridColumn: '1 / 3',
        }}
      >
        <label htmlFor="fullName">
          Full Name <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.fullName
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="fullName"
          value={memberInfo.fullName}
          ref={memberInfoRefs.fullname}
          onChange={(e) => {
            updateMemberInfo('fullName', e.target.value);
          }}
        />
      </fieldset>
      <fieldset
        style={{
          gridColumn: '3 / 5',
        }}
      >
        <label>
          Email Address <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.email
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="email"
          value={memberInfo.email}
          ref={memberInfoRefs.email}
          onChange={(e) => {
            updateMemberInfo('email', e.target.value);
          }}
        />
      </fieldset>
      <fieldset
        style={{
          gridColumn: '1 / 5',
        }}
      >
        <label>
          Mailing Address <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.address
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="address"
          value={memberInfo.address}
          ref={memberInfoRefs.address}
          onChange={(e) => {
            updateMemberInfo('address', e.target.value);
          }}
        />
      </fieldset>
      <fieldset
        style={{
          gridColumn: '1 / 3',
        }}
      >
        <label>
          City <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.city
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="city"
          value={memberInfo.city}
          ref={memberInfoRefs.city}
          onChange={(e) => {
            updateMemberInfo('city', e.target.value);
          }}
        />
      </fieldset>
      <fieldset
        style={{
          gridColumn: '3 / 4',
        }}
      >
        <label>
          State <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.state
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="state"
          value={memberInfo.state}
          ref={memberInfoRefs.state}
          onChange={(e) => {
            updateMemberInfo('state', e.target.value);
          }}
        />
      </fieldset>
      <fieldset
        style={{
          gridColumn: '4 / 5',
        }}
      >
        <label>
          Zip Code <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.zip
              ? 'member-info-field'
              : 'member-info-field member-info-field--invalid'
          }
          type="text"
          name="zip"
          value={memberInfo.zip}
          ref={memberInfoRefs.zip}
          onChange={(e) => {
            updateMemberInfo('zip', e.target.value);
          }}
        />
      </fieldset>
      <fieldset style={{gridColumn: '1 / 3'}}>
        <label>
          <input
            type="checkbox"
            checked={includeAdsMembership}
            onChange={(e) => {
              setIncludeAdsMembership(!includeAdsMembership);
            }}
          />
          Include ADS Membership
        </label>
      </fieldset>
      <div
        style={{
          gridColumn: '1 / 3',
        }}
      >
        {_.map(donationProduct.options, (option) => {
          return (
            <DonationOption
              key={option.name}
              name={option.name}
              values={option.values}
            />
          );
        })}
      </div>
      <div style={{gridColumn: '1 / 5'}}>
        <Tally
          amounts={[
            {
              label: 'YDS Membership',
              include: true,
              price: ydsMembershipVariant.priceV2.amount,
            },
            {
              label: 'ADS Membership',
              include: includeAdsMembership,
              price: adsMembershipVariant.priceV2.amount,
            },
            {
              label: 'Optional Donation',
              include: includeDonation,
              price: donationVariant.priceV2.amount,
            },
          ]}
        />
        <button className="button" onClick={addToCart}>
          Add to Cart
        </button>
        <div style={{color: '#c65a60', marginTop: '2rem'}}>
          <em>* Required Field</em>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
