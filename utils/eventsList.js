export const eventTypes = {
  workday: "workday",
  meeting: "meeting",
};

export const events = [
  {
    date: "2021-04-11",
    time: "11:00 am – 1:00 pm",
    name: "Talking Dahlias with Paula from Garden Bee Flower Farm",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return (
            <p>
              Virtual Meeting (Zoom meeting info will be emailed to members)
            </p>
          );
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <span>
              <p>
                Y.D.S is thrilled to have Paula Fisher from{" "}
                <a
                  href="#"
                  target="_blank"
                  title="Garden Bee Flower Farm Website">
                  {" "}
                  Garden Bee Flower Farm
                </a>
                , located in the Piedmont Triad of North Carolina. Paula’s
                background includes volunteering as a master gardener since
                2015. Her flower farming started six years ago with four
                100-foot beds on her newly purchased property. After attending a
                flower farming workshop she jumped right into the role and since
                then her business has expanded to 10 times that original bed
                space.
              </p>
              <p>
                Dahlias have taken the lead in what Paula really loves to grow
                and that has motivated her to grow over 200 varieties. The farm
                encompasses one acre of seasonal flowers and dahlias and
                produces 500-1000 dahlias weekly to a large floral industry
                wholesaler. She enjoys taking notes on the varieties she grows
                to evaluate which ones grow well in hot humid conditions.
              </p>
              <p>
                Paula is also a member of the American Dahlia Society and her
                local chapter, Carolinas Dahlia Society in NC. She awaits the
                day for shows to resume and looks forward to showing dahlias.
                Paula will take us through her journey as a flower farmer,
                dahlia grower and enthusiast sharing a seasonal overview, some
                background behind the business and tips about growing dahlias
                from seed, cuttings and tubers. You don’t want to miss this
                opportunity to meet with Paula and join us for our first club
                meeting.
              </p>
              <p>
                (Please log in at 10:45 to say hello and get settled. Meeting
                will start promptly at 11:00am)
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: "2021-05-16",
    time: "11:00 am – 1:00 pm",
    name: "Dahlia Questions & Conversation",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return (
            <span>
              Virtual Meeting (Zoom meeting info will be emailed to members)
            </span>
          );
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <span>
              <p>
                Whether you are an experienced dahlia grower or are new to
                growing dahlias, there will always be something new to learn.
                Everyone has questions about dahlias, and we invite you to come
                and share yours! As a club, together we all have decades of
                collective experience to draw on to help every one of us learn
                more about our favorite flower and have fun doing it! For those
                that are newer to growing please bring your questions, for those
                that have more experience please join us to help each other.
              </p>
              <p>
                In preparation, please send in your pictures with your questions
                so we can share images and help answer questions during the
                meeting. Experienced dahlia growers, please send in your dahlia
                tips and pictures of your current dahlia growing update as we
                would love to share.
              </p>
              <p>
                Email
                <a
                  href="mailto:info@yankeedahliasociety.com"
                  target="_blank"
                  rel="noreferrer">
                  info@yankeedahliasociety.com
                </a>
                <br />
                Subject: Dahlia Questions or Dahlia Tip
              </p>
              <p>
                (Please log in at 10:45 to say hello and get settled. Meeting
                will start promptly at 11:00am)
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: "2021-06-27",
    time: "3:00 pm – 5:00 pm",
    name: "Dahlias; Diseases & Pests",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return <p>Zoom, details to come</p>;
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <p>
              While we can’t eliminate pests and diseases from our gardens, we
              can take steps to limit the damage they can cause. What should you
              look for and then what can you do? Beginners, come and learn what
              you can do to help your dahlias stay healthy, happy and beautiful.
              Experienced growers, share your successes, tips and strategies
              you’ve learned in your own gardens. Together we can win the battle
              of the bugs and grow healthy and happy dahlias!
            </p>
          );
        },
      },
    ],
  },
  {
    date: "2021-07-18",
    time: "10:00 am – 1:00 pm",
    name: "Come Celebrate our First In-person Club Meeting",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return (
            <p>Maplebrook Farmstead, 155 Tuttle Road, Sterling, MA 01564</p>
          );
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <span>
              <p>
                Join Y.D.S. at Maplebrook Farmstead, one of our growing partners
              </p>
              <p>
                Our very first in-person meeting is rescheduled for Sunday, July
                18th at Maplebrook Farmstead in Sterling, MA. Rain or Shine. We
                will have a large tent to gather under for shade or in case of
                rainy weather.
              </p>
              <p>
                It should be a nice summer afternoon for our first ever
                in-person club meeting! Bring your dahlia enthusiasm and join us
                for some fun at the farm. Joel Betts, Conservation Planner with
                Worcester County Conservation District, will be with us to
                demonstrate soil sampling and answer all your soil questions.
                Vijaya (Vee) Maclean from Best Buds Worm Castings will talk
                about soil nutrition and biology, and will have her soil
                amendment products available for purchase. We will give
                demonstrations of planting tubers, staking plants, taking
                cuttings, dividing, pinching, and sharing tips to make your
                growing season a success. Bring chairs and a picnic lunch, and
                see the farm as we kick off the growing season and meet our
                growing partners and members. We will come back in October to
                see what the farm looks like in full bloom.
              </p>
              <p>
                Maplebrook Farmstead farm stand will be open and have goodies
                and aged manure for purchase. For aged manure, $5/Bucket, BYO
                bucket & fill your own bucket.
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: "2021-08-29",
    time: "TBD",
    name: "Garden Walk, Potluck BBQ & Reading the ADS Classification Book",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return <p>Misty Florez’s Garden, Woburn, MA</p>;
        },
      },
    ],
  },
  {
    date: "2021-09-19",
    time: "10:00am - 12:00pm",
    name: "Garden Tour hosted by Robin Sears of Robin’s Nest Designs",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return <p>Details Emailed to Y.D.S. Members</p>;
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <span>
              <p>
                Coffee, Scones, Garden Tour & Floral Arrangement Demonstration
                hosted by Robin Sears of{" "}
                <a
                  href="https://www.robinsears.com/"
                  target="_blank"
                  rel="noreferrer">
                  Robin’s Nest Designs
                </a>
                . Remember to bring your folding chair and a few blooms in a bud
                vase to show.
              </p>
              <p>
                We hope to see you for a beautiful end of summer meeting and
                Sunday morning tour of Robin’s garden. This whimsical cottage
                garden design is a treat to visit. Robin will take us on a tour
                of her garden sharing her favorite dahlias and her garden design
                style. Don’t forget to bring your folding chair because we will
                also be treated to a floral design demonstration arranged by
                Robin with dahlias and blooms from her garden. We’ll provide the
                coffee, fresh scones from a local bakery with cream & jam. It
                will be wonderful to hear how everyone’s dahlias are blooming so
                don’t forget to bring some of your blooms too as we will have a
                table set up and would love to see what favorite varieties you
                are growing.
              </p>
              <span>
                <b>Rain Dates:</b>
              </span>
              <p>
                Weather is looking good folks. We should be fine, but if needed
                our plan b will be a virtual meeting and a Zoom link will be
                sent out via email to notify members.
              </p>
              <span>
                <b>RSVP:</b>
              </span>
              <p>
                Not required. It would be wonderful to know if you are able to
                join us as we would like to make sure to have enough scones and
                coffee. Please sign up through the email Sign-Up Genius Link
                emailed to members.
              </p>
              <span>
                <b>Guests:</b>
              </span>
              <p>
                September blooming time is the perfect time to tell your friends
                about Y.D.S. We welcome guests and simply ask if they can
                R.S.V.P so we know they are coming.
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: "2021-10-03",
    time: "10:00am - 12:00pm",
    name: "Coffee & Cider Donuts @ Maplebrook – Learning about fall dahlia culture.",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return (
            <p>Maplebrook Farmstead, 155 Tuttle Road, Sterling, MA 01564</p>
          );
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <span>
              <p>
                Join us for mingling with coffee and cider donuts, a tour of the
                Farm in bloom (over 150 dahlia varieties to see). We’ll have a
                Dahlia Display Table to enrich our understanding and learn about
                forms and sizes as well as preview Seasonal Dahlia Culture for
                the Fall: digging, dividing and storing. It’s also a wonderful
                opportunity to see a selection of blooms in person and start
                making your wish list and preview dahlias for the 2022 club
                tuber sale.
              </p>
              <p>
                Remember to bring your folding chair and a few blooms in a bud
                vase to show.
              </p>
              <span>
                <b>Rain or Shine:</b>
              </span>
              <p>
                We will have a large canopy tent to host in case of rain or for
                shade.
              </p>
              <span>
                <b>RSVP:</b>
              </span>
              <p>
                Not required. It would be wonderful to know if you are able to
                join us as we would like to make sure to have enough coffee
                &amp; cider donuts. Please sign up through the email Sign-Up
                Genius Link emailed to members.
              </p>
              <span>
                <b>Guests:</b>
              </span>
              <p>
                We&rsquo;re still fortunate to have blooms in October, so
                it&rsquo;s still the perfect time to tell your friends about
                Y.D.S. We welcome guests and simply ask if they can R.S.V.P so
                we know they are coming.
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-11",
    dateEnd: "2021-11-14",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-18",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Dudley, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-19",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-20",
    time: "10am-2pm",
    name: "Dividing Club Tubers @ Westwood, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
      {
        name: "Location",
        content: () => {
          return (
            <>
              <p>Westwood Library</p>
              <p>660 High Street</p>
              <p>Westwood, MA 02090</p>
              <p>1st Floor Meeting Space</p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-21",
    time: "12am-4pm",
    name: "Dividing Club Tubers @ Framingham, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
      {
        name: "Location",
        content: () => {
          return (
            <>
              <p>Framingham Library</p>
              <p>McAuliffe Branch</p>
              <p>746 Water Street</p>
              <p>Framingham, MA 01701</p>
              <p>Craft Room</p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-22",
    time: "10am-2pm",
    name: "Dividing Club Tubers @ Westwood, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
      {
        name: "Location",
        content: () => {
          return (
            <>
              <p>Westwood Library</p>
              <p>660 High Street</p>
              <p>Westwood, MA 02090</p>
              <p>1st Floor Meeting Space</p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-11-26",
    dateEnd: "2021-11-28",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-12-02",
    dateEnd: "2021-12-05",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-12-09",
    dateEnd: "2021-12-12",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2021-12-16",
    dateEnd: "2021-12-19",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-01-01",
    dateEnd: "2022-01-07",
    time: "9am-2pm",
    name: "Dividing Club Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-01-13",
    dateEnd: "2022-01-14",
    time: "9am-2pm",
    name: "Reviewing Inventory/Dividing Tubers @ Woburn, MA",
    label: eventTypes.workday,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We need your help dividing our many club tubers for our January
                Tuber Sale. Everyone is welcomed! Both new and experienced
                members who can and want to learn how to divide are welcomed as
                there are many other steps to help out with as well; Dividing,
                labeling, cleaning tubers & inventory. Please sign up so we can
                have an awesome 2022 Tuber Sale.
              </p>
              <p>
                To RSVP for this work day look for the Signup Genius link in the
                monthly club newsletter.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-01-23",
    time: "11am-2pm",
    name: "New Year Club Party Celebration @ Spence Farm in Woburn, MA",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                We will kick off the new year in January at Spence Farm with a
                party, fun dahlia themed raffle items to choose from as well as
                door prizes and the Generous Gardeners as our special guest
                speaker. Save the date for Sunday, January 23, 2022 from 11-2pm.
                For those that purchase from the Y.D.S. tuber sale in January,
                this will be your opportunity to come pick up your dahlia tuber
                order.
              </p>
              <p>
                Yankee Dahlia Society is excited to host Susan Kelly, one of the
                co-founders of Generous Gardeners. Come learn about this
                wonderful non-profit organization and amazing dedicated team of
                volunteers who design and maintain over 45 public garden spaces
                in Gloucester, Massachusetts. She will share with us details on
                their amazing display of over 900 dahlias on Stacy Boulevard
                near the historic Fishermen’s Memorial. You won’t want to miss
                this slide show presentation and details on their approach to
                planting their display beds filled with both our favorite dahlia
                varieties and complementary underplantings of gorgeous annuals
                and daylilies. It is just the thing that will get us all excited
                as we make plans for our own gardens and the upcoming growing
                season.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-02-06",
    time: "10:30am-12:30pm",
    name: "Virtual Meeting: With Special Guest Pauline Mourits from Cloverhome.NL",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                Our February meeting will be via Zoom. Join us with a cup of
                coffee in the morning as we meet online with other dahlia
                growers around the United States and the world. Yankee Dahlia
                Society is absolutely excited for everyone to meet Pauline
                Mourits, a talented photographer and writer with a love for
                gardening and dahlias! We are thrilled that Pauline will join us
                remotely all the way from the Netherlands. Pauline will take us
                on a slide show tour of Dutch growing and some of their amazing
                gardens, of course highlighting dahlia culture. You won’t want
                to miss Pauline sharing with us her beautiful images and talking
                about her design style and her approach to growing and arranging
                flowers with a special emphasis on how she photographs flowers.
              </p>
              <p>
                Yankee Dahlia Society is proud and honored to connect with
                dahlia growers all around the world and share in the joy dahlias
                bring.
              </p>
              <p>
                <a
                  href="https://www.cloverhome.nl/"
                  target="_blank"
                  rel="noreferrer">
                  https://www.cloverhome.nl/
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/cloverhome.nl/"
                  target="_blank"
                  rel="noreferrer">
                  https://www.instagram.com/cloverhome.nl/
                </a>
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-03-06",
    time: "11am-1pm",
    name: "In-Person Workshop @ Spence Farm in Woburn, MA",
    label: eventTypes.meeting,
  },
  {
    date: "2022-04-03",
    time: "TBD",
    name: "Virtual Meeting: With a Special Guest",
    label: eventTypes.meeting,
  },
  {
    date: "2022-05-01",
    time: "9:15am–12:15pm",
    name: "In-Person meeting with Y.D.S. Member Presentation @ Spence Farm in Woburn, MA",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return (
            <p>
              Spence Farm @ Hurld Wyman Elementary School, 41 Wyman Street,
              Woburn, MA 01801
            </p>
          );
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                Our May 1st meeting will be in person at Spence Farm in Woburn.
                We are so very thrilled to have YDS Member Andrea Campbell share
                with us a slide show presentation on propagating dahlias from a
                sport and how to collect dahlia seeds. Another fantastic program
                as we continue our dahlia education at our monthly meetings.
                Andrea will have some wonderful images to share along with first
                hand experience propagating a sport since the fall. In addition,
                Andrea has been extremely successful in collecting and growing
                dahlias from seeds. Be sure to join us and get some tips as we
                get ready for the 2022 dahlia growing season. You’ll know what
                to do if you find a dahlia sport in your garden and want to
                collect your own dahlia seeds this season.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-06-26",
    time: "10:00am – 12:00pm",
    name: "Virtual Meeting: Dahlia Virus Presentation by Dr. Hanu Pappu",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Location",
        content: () => {
          return <p>Wenham, MA</p>;
        },
      },
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                Our next meeting will be via Zoom, and we are thrilled to
                announce that our very special guest will be Dr. Hanu Pappu,
                professor in the Department of Plant Pathology at Washington
                State University, Pullman WA, and world renowned expert in
                dahlia viruses.
              </p>
              <p>
                Join us and learn what a dahlia virus is, how a virus can affect
                dahlias, why you should care about them in your garden and what
                to do if you think you have a virused plant. The work Dr. Hanu
                Pappu and his team are doing is ongoing with new and interesting
                developments. We look forward to the presentation with Dr. Pappu
                as we learn about dahlia virus, current research and their
                latest findings.
              </p>
              <p>
                Did you know that the American Dahlia Society supports the WSU
                Virus Project and the research of Dr. Hanu Pappu? The Clean
                Stock Initiative is an ADS program that offers reduced cost
                testing for virus in dahlias to dahlia clubs, individuals and
                commercial dahlia growers subsidized through the Scheetz-Chuey
                Foundation. Yankee Dahlia Society participated in and supports
                the Clean Stock Initiative as it is an excellent way to help
                maintain a healthy garden and dahlia stock.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-07-16",
    time: "10:00am - 1:30pm",
    name: "Previewing the dahlia garden and Lily garden tour with Y.D.S member Roy Christoph",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                Join us for our first member garden tour of 2022 at the garden
                of YDS member Roy Christoph. Roy is a long-time gardener and is
                certified in Organic Land Care (Soil) through Northeast Organic
                Farming Association (NOFA). Roy grew dahlias for the first time
                last year and this year he has a collection of over 275 dahlias
                in his garden, with a goal in mind of winning a dahlia show this
                fall. Prior to growing dahlias, Roy has been growing and showing
                lilies of all types since 1991. His garden showcases 1500 lily
                plants in 250 varieties in addition to the dahlias. Roy is Past
                President of the New England Lily Society and has won the
                regional lily show five times, and the national lily show once.
              </p>
              <p>
                With July being the peak blooming season for lilies, we will be
                treated to a truly amazing display of Roy’s extensive collection
                of lily plants in full bloom. During our visit we will see early
                dahlia growth and get to discuss pinching and topping dahlias,
                along with disbudding, methods of staking dahlias and
                fertilization. You will not want to miss this unique opportunity
                to tour Roy’s large and beautiful garden. Bring chairs and a
                picnic lunch to enjoy.
              </p>
            </>
          );
        },
      },
      {
        name: "Rain Date",
        content: () => {
          return (
            <>
              <p>
                We will cross our fingers for good weather, but if needed our
                Rain Date will be Sunday, July 17th.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-08-11",
    time: "7:00pm - 9:00pm",
    name: "Zoom Meeting - Introduction to Showing & Judging Dahlias with Special Guests Kathleen Burke & Jim Teeple from Mid Island Dahlia Society",
    label: eventTypes.meeting,
    showMore: [
      {
        name: "Details",
        content: () => {
          return (
            <>
              <p>
                The end of August and the month of September are dahlia show
                season. Have you ever been to a local or national dahlia show?
                Dahlia shows are not just for those who show or judge dahlias.
                Attending a dahlia show is a wonderful way to enrich your dahlia
                knowledge. We are excited to have guest presenters Jim Teeple
                and Kathy Burke from Mid Island Dahlia Society share their
                expertise as ADS Senior Judges for dahlia shows and what it
                means to judge and show dahlias. Knowing more about the dahlia
                judging process enhances your appreciation for dahlia blooms and
                will give you a better understanding of growing dahlias. We hope
                that this introduction by Jim and Kathy may also inspire you to
                attend and maybe participate in a local show, or even the
                National Dahlia Show.
              </p>
            </>
          );
        },
      },
    ],
  },
  {
    date: "2022-09-18",
    time: "TBD",
    name: "Dahlia Garden Tour and Dahlia Study Program",
    label: eventTypes.meeting,
  },
  {
    date: "2022-10-06",
    time: "7:00pm - 9:00pm",
    name: "Zoom Meeting - Very special Guest Floral Design Presentation",
    label: eventTypes.meeting,
  },
];
