export const eventTypes = {
  workday: 'workday',
  meeting: 'meeting',
};

export const events = [
  {
    date: '2021-04-11',
    time: '11:00 am – 1:00 pm',
    name: 'Talking Dahlias with Paula from Garden Bee Flower Farm',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return (
            <p>
              Virtual Meeting (Zoom meeting info will be emailed to members)
            </p>
          );
        },
      },
      {
        name: 'Details',
        content: () => {
          return (
            <span>
              <p>
                Y.D.S is thrilled to have Paula Fisher from{' '}
                <a
                  href="#"
                  target="_blank"
                  title="Garden Bee Flower Farm Website"
                >
                  {' '}
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
    date: '2021-05-16',
    time: '11:00 am – 1:00 pm',
    name: 'Dahlia Questions & Conversation',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return (
            <span>
              Virtual Meeting (Zoom meeting info will be emailed to members)
            </span>
          );
        },
      },
      {
        name: 'Details',
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
                <a href="mailto:info@yankeedahliasociety.com" target="_blank">
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
    date: '2021-06-27',
    time: '3:00 pm – 5:00 pm',
    name: 'Dahlias; Diseases & Pests',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return <p>Zoom, details to come</p>;
        },
      },
      {
        name: 'Details',
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
    date: '2021-07-18',
    time: '10:00 am – 1:00 pm',
    name: 'Come Celebrate our First In-person Club Meeting',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return (
            <p>Maplebrook Farmstead, 155 Tuttle Road, Sterling, MA 01564</p>
          );
        },
      },
      {
        name: 'Details',
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
    date: '2021-08-29',
    time: 'TBD',
    name: 'Garden Walk, Potluck BBQ & Reading the ADS Classification Book',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return <p>Misty Florez’s Garden, Woburn, MA</p>;
        },
      },
    ],
  },
  {
    date: '2021-09-19',
    time: '10:00am - 12:00pm',
    name: 'Garden Tour hosted by Robin Sears of Robin’s Nest Designs',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return <p>Details Emailed to Y.D.S. Members</p>;
        },
      },
      {
        name: 'Details',
        content: () => {
          return (
            <span>
              <p>
                Coffee, Scones, Garden Tour & Floral Arrangement Demonstration
                hosted by Robin Sears of{' '}
                <a href="https://www.robinsears.com/" target="_blank">
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
    date: '2021-10-03',
    time: '10:00am - 12:00pm',
    name: 'Coffee & Cider Donuts @ Maplebrook – Learning about fall dahlia culture.',
    label: eventTypes.meeting,
    showMore: [
      {
        name: 'Location',
        content: () => {
          return (
            <p>Maplebrook Farmstead, 155 Tuttle Road, Sterling, MA 01564</p>
          );
        },
      },
      {
        name: 'Details',
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
                join us as we would like to make sure to have enough coffee &
                cider donuts. Please sign up through the email Sign-Up Genius
                Link emailed to members.
              </p>
              <span>
                <b>Guests:</b>
              </span>
              <p>
                We're still fortunate to have blooms in October, so it's still
                the perfect time to tell your friends about Y.D.S. We welcome
                guests and simply ask if they can R.S.V.P so we know they are
                coming.
              </p>
            </span>
          );
        },
      },
    ],
  },
  {
    date: '2021-11-11',
    dateEnd: '2021-11-14',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-11-18',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Dudley, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-11-19',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-11-20',
    time: '10am-2pm',
    name: 'Dividing Club Tubers @ Westwood, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
        name: 'Location',
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
    date: '2021-11-21',
    time: '12am-4pm',
    name: 'Dividing Club Tubers @ Framingham, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
        name: 'Location',
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
    date: '2021-11-22',
    time: '10am-2pm',
    name: 'Dividing Club Tubers @ Westwood, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
        name: 'Location',
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
    date: '2021-11-26',
    dateEnd: '2021-11-28',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-12-02',
    dateEnd: '2021-12-05',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-12-09',
    dateEnd: '2021-12-12',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
    date: '2021-12-16',
    dateEnd: '2021-12-19',
    time: '9am-2pm',
    name: 'Dividing Club Tubers @ Woburn, MA',
    label: eventTypes.workday,
    showMore: [
      {
        name: 'Details',
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
];
