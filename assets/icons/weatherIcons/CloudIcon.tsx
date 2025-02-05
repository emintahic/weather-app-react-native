import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const CloudIcon = (props) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
        d="M7.27004 13.01C6.74004 12.74 6.15004 12.6 5.55004 12.6C0.870039 12.93 0.870039 19.74 5.55004 20.07H16.64C17.99 20.08 19.29 19.58 20.28 18.67C23.57 15.8 21.81 10.03 17.48 9.48C15.92 0.110001 2.39004 3.67 5.60004 12.6"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8501 9.92001C16.3701 9.66001 16.9401 9.52001 17.5201 9.51001"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default CloudIcon;
