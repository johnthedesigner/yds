import { useState } from 'react'
import Page from '../../components/page'
import pages from '../../pages.json'
import Hero from '../../components/hero'
import { CompactTextWrapper, CompactText } from '../../components/compactText'

export default function Join() {
    // const [base, setBase] = useState(44)
    const [membershipType, setMembershipType] = useState('individual')
    const [donation, setDonation] = useState(25)
    const [includeDonation, setIncludeDonation] = useState(false)

    const baseRates = {
        business: 50,
        individual: 35,
    }
    const getBase = () => {
        return baseRates[membershipType]
    }

    const getItemName = () => {
        let itemName = `Membership Type: ${membershipType}, Donation Included: ${includeDonation}`
        if (includeDonation) {
            itemName += `, Donation Amount: ${donation}`
        }
        return itemName
    }

    const getMembershipText = () => {
        if (membershipType == 'individual') {
            return <p>If</p>
        }
    }

    const dollarize = (value) => `$${value}.00`

    const Tally = (props) => {
        return <div className="tally">{props.children}</div>
    }

    const TallyItem = (props) => {
        let figureStyles = {
            textDecoration: props.strikethrough ? 'line-through' : 'none',
            opacity: props.strikethrough ? 0.5 : 1,
        }

        return (
            <p className="tally__item">
                {props.name}:{' '}
                <span className="tally__figure" style={figureStyles}>
                    {props.amount}
                </span>
            </p>
        )
    }

    const TallyTotal = (props) => {
        return (
            <p className="tally__total">
                Total: <span className="tally__figure">{props.amount}</span>
            </p>
        )
    }

    return (
        <Page page={pages.join} backgroundClass="page__body--flower1">
            <Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />
            <CompactTextWrapper>
                <CompactText>
                    <h3>WE WANT YOU for Yankee Dahlia Society!</h3>
                    <p>
                        Sign up now and receive an extended membership for your
                        first year. Our membership year normally runs from
                        August 1 through July 31. Join anytime between now and
                        August 1, and your membership will remain valid through
                        July 31, 2022. It’s a great time to join us as we
                        launch!
                    </p>
                </CompactText>
                <CompactText>
                    <fieldset>
                        <label for="membership_type">
                            Select Membership Type
                        </label>
                        <select
                            id="membership_type"
                            name="membership_type"
                            onChange={(e) => {
                                setMembershipType(e.target.value)
                            }}
                        >
                            <option value="individual">
                                Individual Membership – $35.00
                            </option>
                            <option value="business">
                                Business Membership – $50.00
                            </option>
                        </select>
                    </fieldset>
                    <p>
                        Business memberships get extra club perks. We love
                        promoting our members’ businesses{' '}
                        <em>(but it’s not required)</em>.
                    </p>
                    <hr className="form-divider" />
                    <fieldset>
                        <p>
                            Help us hit the ground running with an extra
                            donation. We appreciate anything else you can give.
                            Founders Circle donations of $25 or more will
                            receive a special token of our appreciation.
                        </p>
                        <input
                            id="include_donation"
                            name="include_donation"
                            type="checkbox"
                            value={includeDonation}
                            onChange={() =>
                                setIncludeDonation(!includeDonation)
                            }
                        />
                        <label className="inline-label" for="include_donation">
                            Include donation?
                        </label>
                        <label for="donation_amount">Donation Amount</label>
                        <input
                            id="donation_amount"
                            type="text"
                            value={donation}
                            onChange={(e) => setDonation(1 * e.target.value)}
                            disabled={!includeDonation}
                        />
                    </fieldset>
                    <Tally>
                        <TallyItem
                            name="Base Rate"
                            amount={dollarize(getBase())}
                        />
                        <TallyItem
                            name="Optional Donation"
                            strikethrough={!includeDonation}
                            amount={dollarize(donation)}
                        />
                        <TallyTotal
                            amount={dollarize(
                                includeDonation
                                    ? donation + getBase()
                                    : getBase()
                            )}
                        />
                    </Tally>
                    <form
                        action="https://www.paypal.com/cgi-bin/webscr"
                        method="post"
                    >
                        <input type="hidden" name="cmd" value="_xclick" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input
                            type="hidden"
                            name="business"
                            value="info@yankeedahliasociety.com"
                        />

                        <input
                            type="hidden"
                            name="membership-type"
                            value={membershipType}
                        />
                        <input
                            type="hidden"
                            name="donation"
                            value={includeDonation ? donation : 0}
                        />

                        <input type="hidden" name="no_shipping" value="1" />

                        <input
                            type="hidden"
                            name="item_name"
                            value={getItemName()}
                        />

                        <input
                            type="hidden"
                            name="amount"
                            value={
                                includeDonation
                                    ? donation + getBase()
                                    : getBase()
                            }
                        />

                        <button className="button" type="submit">
                            Purchase Membership
                        </button>
                    </form>
                </CompactText>
            </CompactTextWrapper>
        </Page>
    )
}
