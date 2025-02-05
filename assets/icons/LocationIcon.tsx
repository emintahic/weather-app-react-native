import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
const LocationIcon = (props) => (
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
        d="M3 10.8074C3 9.9094 3.40231 9.0586 4.09639 8.48876L9.46186 4.08378C10.9372 2.87254 13.0628 2.87255 14.5381 4.08378L19.9036 8.48876C20.5977 9.0586 21 9.9094 21 10.8074V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V10.8074Z"
        stroke="#000000"
        strokeWidth={1.9200000000000004}
      />
    </G>
  </Svg>
);
export default LocationIcon;
