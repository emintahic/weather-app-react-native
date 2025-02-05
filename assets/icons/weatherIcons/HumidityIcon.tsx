import * as React from "react";
import Svg, { G, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */
const HumidityIcon = (props) => (
  <Svg
    viewBox="-6 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="#ffffff"
    stroke="#ffffff"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Defs />
      <G
        id="Page-1"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <G
          id="Icon-Set-Filled"
          transform="translate(-316.000000, -829.000000)"
          fill="#ffffff"
        >
          <Path
            d="M326,829 C322.917,832.731 316,845.478 316,851 C316,856.523 320.478,861 326,861 C331.522,861 336,856.523 336,851 C336,845.478 329.012,832.66 326,829"
            id="raindrop"
          />
        </G>
      </G>
    </G>
  </Svg>
);
export default HumidityIcon;
