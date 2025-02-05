import DubaiIcon from "../icons/cities/DubaiIcon";
import LondonIcon from "../icons/cities/LondonIcon";
import NewYorkIcon from "../icons/cities/NewYorkIcon";
import RioIcon from "../icons/cities/RioIcon";
import SanFranciscoIcon from "../icons/cities/SanFranciscoIcon";
import SydneyIcon from "../icons/cities/SydneyIcon";
import VeniceIcon from "../icons/cities/VeniceIcon";

export const DEFAULT_CITIES = [
  {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
    icon: <NewYorkIcon width={36} height={36} />,
  },
  {
    name: "London",
    lat: 51.5074,
    lon: -0.1278,
    icon: <LondonIcon width={36} height={36} />,
  },
  {
    name: "Venice",
    lat: 45.438,
    lon: 12.327,
    icon: <VeniceIcon width={36} height={36} />,
  },
  {
    name: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    icon: <SydneyIcon width={36} height={36} />,
  },
  {
    name: "Dubai",
    lat: 25.276987,
    lon: 55.296249,
    icon: <DubaiIcon width={36} height={36} />,
  },
  {
    name: "Rio de Janeiro",
    lat: -22.9068,
    lon: -43.1729,
    icon: <RioIcon width={36} height={36} />,
  },
  {
    name: "San Francisco",
    lat: 37.7749,
    lon: -122.4194,
    icon: <SanFranciscoIcon width={36} height={36} />,
  },
];
