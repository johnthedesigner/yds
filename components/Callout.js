const Callout = ({ callouts }) => {
  return (
    <>
      {callouts[0] && (
        <svg
          className="product-callout"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect
              x="-35"
              y="106.421"
              width="200"
              height="18"
              transform="rotate(-45 -35 106.421)"
              fill="#C65A60"></rect>
            <rect
              x="-39"
              y="102.421"
              width="200"
              height="18"
              transform="rotate(-45 -39 102.421)"
              fill="#506F98"
            />
            <rect
              x="-37"
              y="104.421"
              width="200"
              height="18"
              transform="rotate(-45 -37 104.421)"
              fill="#FFF0EE"
            />
            <text
              fill="#752731"
              x="42"
              y="42"
              textAnchor="middle"
              transform="rotate(-45,42,42)"
              fontStyle="italic"
              fontSize="9">
              {callouts[0]}
            </text>
          </g>
          <defs>
            <clipPath id="clip0_1_2">
              <rect width="100" height="100" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};

export default Callout;
