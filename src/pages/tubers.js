import Link from 'next/link'
import Page from '../components/page'
import Hero from '../components/hero'
import Pingpong from '../components/pingpong'
import Bumper from '../components/bumper'
import pages from '../pages.json'
import styles from '../styles/Tubers.module.css'

export default function Events() {
    return (
        <Page page={pages.tubers}>
            <div className={styles.tubers__body}>
                <Hero title="Our Tubers" image="/dividing-dahlias.jpg" />
                <Pingpong
                    side="left"
                    image="/tubers.jpg"
                    imageAlt="Dahlia tubers ready to be divided"
                >
                    <h3>Preparing for Our Inaugural Tuber Sale in 2022</h3>
                    <p>
                        Naturally a dahlia club needs dahlias to support club
                        activities and education.
                    </p>
                    <p>
                        We have a plan to grow our tuber stock through our
                        Growing Partners for the 2021 season so we can have a
                        huge sale in 2022. Spring tuber sales provide a major
                        source of funding for club activities while being a
                        great source for members to have access to tubers for
                        sale. Over the last several months our founders have
                        personally supported the purchase of nearly 500 tubers
                        from growers around the US and in addition contributed
                        more than 100 tubers from their personal collections. We
                        look forward to having over 200 varieties to offer for
                        our first sale in 2022.
                    </p>
                    <p>
                        Yankee Dahlia Society has connected with several Growing
                        Partners who generously share their extra growing space
                        to grow dahlia plants and tubers for the club. YDS
                        supplies the tubers to our growing partner and in
                        exchange our Growing Partner gets the cut flowers during
                        the season to do with as they wish while the club gets
                        the tubers at the end of the season.
                    </p>
                    <p>
                        Do you have extra space to grow Y.D.S. tubers? If so,
                        we'd love to talk with you about growing partnerships.
                    </p>
                    <Link href="/contact">
                        <a
                            className="button"
                            title="Contact Us About Growing Partnerships"
                        >
                            Contact Us About Growing Partnerships
                        </a>
                    </Link>
                </Pingpong>
                <Bumper
                    text="Interested in Tuber Sales & Swaps? Become a Member to Get Updates!"
                    buttonUrl="/membership"
                    buttonLabel="Membership Info"
                />
            </div>
        </Page>
    )
}
