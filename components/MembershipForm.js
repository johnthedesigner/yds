// import { flattenConnection, useCart } from "@shopify/hydrogen/client";
import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";

import { flattenConnection } from "../utils/shopify";
import { CartContext } from "../pages/_app";

const MembershipForm = ({ ydsMembershipProduct, donationProduct }) => {
  const { addToCart } = useContext(CartContext);

  // YDS membership product state
  const ydsMembershipVariants = flattenConnection(
    ydsMembershipProduct.variants
  );
  const [ydsMembershipVariant, setYdsMembershipVariant] = useState(
    ydsMembershipVariants[0]
  );
  const [ydsMembershipOptions, setYdsMembershipOptions] = useState(
    ydsMembershipVariants[0].selectedOptions
  );
  const ydsMembershipType = _.find(ydsMembershipVariant.selectedOptions, {
    name: "Membership Type",
  }).value;

  // Included donation state
  const [includeDonation, setIncludeDonation] = useState(false);
  const donationVariants = flattenConnection(donationProduct.variants);
  // Start with second option by default ($25)
  const [donationVariant, setDonationVariant] = useState(donationVariants[2]);
  const [donationOptions, setDonationOptions] = useState(
    donationVariant.selectedOptions
  );

  // Member Info Data state
  const [memberInfo, setMemberInfo] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Member Info Validation state
  const [memberInfoValidation, setMemberInfoValidation] = useState({
    businessName: true,
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    address: true,
    city: true,
    state: true,
    zip: true,
  });
  const [memberInfoDirty, setMemberInfoDirty] = useState(false);

  // Member Info Field Refs
  const memberInfoRefs = {
    businessName: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    address: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip: useRef(null),
  };

  // Member Info Validation
  const memberInfoValidators = {
    businessName: (value) => {
      if (ydsMembershipType === "Business") {
        return value != "";
      } else {
        return true;
      }
    },
    firstName: (value) => {
      return value != "";
    },
    lastName: (value) => {
      return value != "";
    },
    phone: (value) => {
      return value != "";
    },
    email: (value) => {
      let emailCheck =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return value.match(emailCheck);
    },
    address: (value) => {
      return value != "";
    },
    city: (value) => {
      return value != "";
    },
    state: (value) => {
      return value != "";
    },
    zip: (value) => {
      return value != "";
    },
  };
  // Update individual member info fields
  const updateMemberInfo = (name, value) => {
    let newMemberInfo = { ...memberInfo };
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
    let total = ydsAmount + donationAmount;
    setTallyTotal(total);
  }, [
    ydsMembershipOptions,
    includeDonation,
    donationOptions,
    donationVariant.priceV2.amount,
    ydsMembershipVariant.priceV2.amount,
  ]);

  // TODO: ADD BACK IN SHOPPING CART HANDLING

  // Custom add to cart functionality
  //   const cart = useCart();
  //   const { cartCreate, linesAdd } = cart;

  const addMembershipToCart = async () => {
    // TODO: ADD BACK IN SHOPPING CART HANDLING
    // Start with true validation status
    let valid = true;
    let nextValidationState = {
      ...memberInfoValidation,
    };
    // Get the names of all our fields
    let fieldNames = _.keys(memberInfo);
    // Check validation rules for each field and mark dirty fields
    await _.each(fieldNames, async (name) => {
      if (!memberInfoValidators[name](memberInfo[name])) {
        // Track dirty input for error message
        await setMemberInfoDirty(true);
        // Prevent submission
        valid = false;
        // Mark individual field
        nextValidationState[name] = false;
      }
    });
    await setMemberInfoValidation(nextValidationState);
    if (valid) {
      // Track dirty input for error message
      await setMemberInfoDirty(false);
      let attributes = _.map(memberInfo, (value, key) => {
        // Check if this is a biz membership, if not omit business name
        if (ydsMembershipType === "Business") {
          return { key, value };
        } else {
          if (key === "businessName") {
            // return nothing
          } else {
            return { key, value };
          }
        }
      });
      let newLines = [
        {
          merchandiseId: ydsMembershipVariant.id,
          attributes,
          quantity: 1,
        },
      ];
      // if (includeAdsMembership) {
      //   newLines.push({
      //     merchandiseId: adsMembershipVariant.id,
      //   });
      // }
      if (includeDonation) {
        await newLines.push({
          merchandiseId: donationVariant.id,
          quantity: 1,
        });
      }
      addToCart(newLines);
      // if (cart && cart.id) {
      //   await linesAdd(newLines);
      // } else {
      //   await cartCreate({ lines: newLines });
      // }
    }
  };

  const dollarize = (value) => `$${(1 * value).toFixed(2)}`;

  const Tally = ({ amounts }) => {
    return (
      <>
        {_.map(amounts, (item, index) => {
          return (
            <p key={index} className="tally__item">
              {item.label}:{" "}
              <span
                className="tally__figure"
                style={{
                  textDecoration: !item.include ? "line-through" : "none",
                  opacity: !item.include ? 0.5 : 1,
                }}>
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

  // Change Membership Option and trigger downstream updates
  const changeMembershipOption = (name, value) => {
    // Get the new option name and value

    let nextVariant = getNextVariant(
      ydsMembershipVariants,
      ydsMembershipVariant,
      name,
      value
    );

    setYdsMembershipVariant(nextVariant);
    setYdsMembershipOptions(nextVariant.selectedOptions);
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
  const MembershipOption = ({ name, values }) => {
    let selectedOption = _.find(ydsMembershipOptions, { name });
    let [ydsSelectedValue, setYdsSelectedValue] = useState(
      selectedOption.value
    );
    useEffect(() => {
      setYdsSelectedValue(selectedOption.value);
    }, [selectedOption.value]);

    let description = {
      Business:
        "An individual person with a business can choose this option for membership (but it’s not required).  We love promoting our members’ businesses.",
      Individual: "For one individual dahlia enthusiast.",
    };
    return (
      <fieldset style={{ margin: "1rem 0" }}>
        <label>{name}</label>
        {_.map(values, (value, index) => {
          let candidateVariant = getNextVariant(
            ydsMembershipVariants,
            ydsMembershipVariant,
            name,
            value
          );
          let buttonClass = `button__product-option ${
            ydsSelectedValue === value ? "button__product-option--active" : null
          }`;
          return (
            <fieldset key={index}>
              <button
                className={buttonClass}
                name={name}
                value={value}
                onClick={() => {
                  changeMembershipOption(name, value);
                }}>
                <div>
                  <b>
                    {value} – {dollarize(candidateVariant.priceV2.amount)}
                  </b>
                </div>
                <div>{description[value]}</div>
              </button>
            </fieldset>
          );
        })}
      </fieldset>
    );
  };

  // Build membership form options as dropdowns
  const DonationOption = ({ name, values }) => {
    let selectedOption = _.find(donationOptions, { name });
    return (
      <fieldset style={{ marginBottom: "2rem" }}>
        <label style={{ fontSize: "150%" }}>
          <input
            type="checkbox"
            checked={includeDonation}
            onChange={() => {
              setIncludeDonation(!includeDonation);
            }}
          />
          Include Donation to Yankee Dahlia Society
        </label>
        <p style={{ margin: "1rem .5rem", fontSize: "1.25rem" }}>
          Please consider including a donation to Yankee Dahlia Society. Every
          contribution helps fund our club programming and activities. We
          appreciate your support and are grateful for whatever you can give.
          Yankee Dahlia Society Inc. is a federally registered 501(c)(3) non
          profit organization, and your donation is tax deductible.
        </p>
        <select
          name={name}
          value={selectedOption.value}
          onChange={changeDonationOption}
          disabled={!includeDonation}>
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

  const RequiredMark = () => <span style={{ color: "#c65a60" }}>*</span>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        gridAutoRows: "minmax(3rem, auto",
      }}>
      <div className="form-block__large">
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
      {ydsMembershipType === "Business" && (
        <fieldset className="form-block__large">
          <label htmlFor="busineeName">
            Business Name <RequiredMark />
          </label>
          <input
            className={
              memberInfoValidation.businessName
                ? "member-info-field"
                : "member-info-field member-info-field--invalid"
            }
            type="text"
            name="businessName"
            value={memberInfo.businessName}
            ref={memberInfoRefs.businessName}
            onChange={(e) => {
              updateMemberInfo("businessName", e.target.value);
            }}
          />
        </fieldset>
      )}
      <fieldset className="form-block__medium">
        <label htmlFor="firstName">
          First Name <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.firstName
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="firstName"
          value={memberInfo.firstName}
          ref={memberInfoRefs.firstName}
          onChange={(e) => {
            updateMemberInfo("firstName", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__medium">
        <label htmlFor="lastName">
          Last Name <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.lastName
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="lastName"
          value={memberInfo.lastName}
          ref={memberInfoRefs.lastName}
          onChange={(e) => {
            updateMemberInfo("lastName", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__medium">
        <label htmlFor="email">
          Email Address <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.email
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="email"
          value={memberInfo.email}
          ref={memberInfoRefs.email}
          onChange={(e) => {
            updateMemberInfo("email", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__medium">
        <label htmlFor="phone">
          Phone Number <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.phone
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="phone"
          value={memberInfo.phone}
          ref={memberInfoRefs.phone}
          onChange={(e) => {
            updateMemberInfo("phone", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__large">
        <label htmlFor="address">
          Mailing Address <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.address
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="address"
          value={memberInfo.address}
          ref={memberInfoRefs.address}
          onChange={(e) => {
            updateMemberInfo("address", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__medium">
        <label htmlFor="city">
          City <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.city
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="city"
          value={memberInfo.city}
          ref={memberInfoRefs.city}
          onChange={(e) => {
            updateMemberInfo("city", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__small">
        <label htmlFor="state">
          State <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.state
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="state"
          value={memberInfo.state}
          ref={memberInfoRefs.state}
          onChange={(e) => {
            updateMemberInfo("state", e.target.value);
          }}
        />
      </fieldset>
      <fieldset className="form-block__small">
        <label htmlFor="zip">
          Zip Code <RequiredMark />
        </label>
        <input
          className={
            memberInfoValidation.zip
              ? "member-info-field"
              : "member-info-field member-info-field--invalid"
          }
          type="text"
          name="zip"
          value={memberInfo.zip}
          ref={memberInfoRefs.zip}
          onChange={(e) => {
            updateMemberInfo("zip", e.target.value);
          }}
        />
      </fieldset>
      <div className="form-block__large" style={{ marginTop: "2rem" }}>
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
      <div className="form-block__large">
        <Tally
          amounts={[
            {
              label: "YDS Membership",
              include: true,
              price: ydsMembershipVariant.priceV2.amount,
            },
            {
              label: "Optional Donation",
              include: includeDonation,
              price: donationVariant.priceV2.amount,
            },
          ]}
        />
        <div style={{ textAlign: "right" }}>
          {memberInfoDirty && (
            <p style={{ color: "#c65a60" }}>
              <em>
                Please check your member info above, you may be missing some
                required fields.
              </em>
            </p>
          )}
          <button className="button" onClick={addMembershipToCart}>
            Add to Cart
          </button>
        </div>
        <div style={{ color: "#c65a60", marginTop: "2rem" }}>
          <em>* Required Field</em>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
