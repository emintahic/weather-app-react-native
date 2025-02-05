import { render } from "@testing-library/react-native";
import RealFeelComponent from "@/components/RealFeelComponent";

// Mock the icons
jest.mock("@/assets/icons/weatherIcons/SunIcon", () => "SunIcon");
jest.mock("@/assets/icons/weatherIcons/CloudIcon", () => "CloudIcon");
jest.mock("@/assets/icons/weatherIcons/RainIcon", () => "RainIcon");
jest.mock("@/assets/icons/weatherIcons/StormIcon", () => "StormIcon");
jest.mock("@/assets/icons/weatherIcons/SnowIcon", () => "SnowIcon");

const mockWeatherData = {
  main: {
    feels_like: 28,
  },
  weather: [
    {
      main: "Clear",
      description: "clear sky",
    },
  ],
};

describe("RealFeelComponent", () => {
  it("renders the correct temperature", () => {
    const { getByText, getByTestId } = render(
      <RealFeelComponent weatherData={mockWeatherData} />
    );
    expect(getByText("28°")).toBeTruthy();
    expect(getByText("/ Real Feel")).toBeTruthy();
    expect(getByTestId("temperature")).toBeTruthy();
  });

  it("renders the correct icon for 'Clear' weather", () => {
    const { getByTestId } = render(
      <RealFeelComponent weatherData={mockWeatherData} />
    );
    expect(getByTestId("sun-icon")).toBeTruthy();
  });

  it("renders nothing if weatherData is undefined", () => {
    const { queryByText, queryByTestId } = render(
      <RealFeelComponent weatherData={undefined} />
    );
    expect(queryByText(/°/)).toBeNull();
    expect(queryByText(/Real Feel/)).toBeNull();
    expect(queryByTestId("sun-icon")).toBeNull();
  });
});
