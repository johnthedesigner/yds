import Link from 'next/link'
import Head from 'next/head'

import Page from '../components/page'
import pages from '../pages.json'
import Hero from '../components/hero'
import Pingpong from '../components/pingpong'
import Bumper from '../components/bumper'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <Page page={pages.home}>
            <div className={`page--home ${styles.home__body}`}>
                <Hero
                    title="Yankee Dahlia Society"
                    image="/purple-flowers.jpg"
                    overlay="false"
                    height="40vh"
                />
                <Pingpong
                    side="left"
                    image="planting-dahlias.jpg"
                    imageAlt="A garden with rows of dahlias being planted"
                    ratioWidth={1}
                    ratioHeight={1.5}
                >
                    <h3>
                        <b>We want you!</b> for Yankee Dahlia Society!
                    </h3>
                    <p>
                        YDS Memberships are available today for both individual
                        and business members. Register soon to attend our first
                        meeting!
                    </p>
                    <Link href="/membership">
                        <a
                            className="button"
                            title="Find out more about YDS memberships"
                        >
                            Find out more
                        </a>
                    </Link>
                    <h3>Save the Date: Sunday, April 11, 2021</h3>
                    <p>
                        Be sure to mark your calendar to join us for our very
                        first meeting. It will be a virtual meeting. Stay tuned
                        for more details.
                    </p>
                    <Link href="/meetings">
                        <a
                            className="button"
                            title="Yankee Dahlia Society Meeting Calendar"
                        >
                            Meeting Calendar
                        </a>
                    </Link>
                </Pingpong>
                <Bumper
                    text="Already a member and looking for ways to lend a hand within Yankee Dahlia Society?"
                    buttonUrl="/get-involved"
                    buttonLabel="More Ways to Get Involved"
                />
            </div>
        </Page>
    )
}
