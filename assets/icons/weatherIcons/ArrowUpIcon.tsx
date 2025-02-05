import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const ArrowUpIcon = (props) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(0)"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={`${props.white ? "#fff" : "#ffc800"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default ArrowUpIcon;
