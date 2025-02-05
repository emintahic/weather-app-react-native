import * as React from "react";
import Svg, { G, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */
const WindIcon = (props) => (
  <Svg
    viewBox="0 -1 28 28"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="#000000"
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
          id="Icon-Set"
          transform="translate(-466.000000, -830.000000)"
          fill="#ffffff"
        >
          <Path
            d="M488,844 L467,844 C466.447,844 466,844.447 466,845 C466,845.553 466.447,846 467,846 L486.833,846 C489.687,846 492,847.791 492,850 C492,852.209 490.291,854 486,854 L486,856 L488,856 C491.313,856 494,853.313 494,850 C494,846.687 491.313,844 488,844 L488,844 Z M480.002,848 L480,848 L472,848 C471.447,848 471,848.448 471,849 C471,849.553 471.447,850 472,850 L480,850 C481.104,850 482,850.896 482,852 C482,853.104 481.104,854 480,854 L480,856 C482.209,856 484,854.209 484,852 C484,849.792 482.21,848.002 480.002,848 L480.002,848 Z M475,838 L487,838 C487.553,838 488,837.553 488,837 C488,836.448 487.553,836 487,836 L475,836 C474.447,836 474,836.448 474,837 C474,837.553 474.447,838 475,838 L475,838 Z M470,842 L488,842 C491.313,842 494,839.313 494,836 C494,832.687 491.313,830 488,830 L488,832 C490.822,832.531 492,833.791 492,836 C492,838.209 489.687,840 486.833,840 L470,840 C469.447,840 469,840.448 469,841 C469,841.553 469.447,842 470,842 L470,842 Z"
            id="wind"
          />
        </G>
      </G>
    </G>
  </Svg>
);
export default WindIcon;
