import { render } from "@testing-library/react-native";
import ForecastSlider from "@/components/ForecastSlider";
import { View } from "react-native";

const mockWeatherIcons = {
  Clear: <View testID="clear-icon" />,
  Clouds: <View testID="clouds-icon" />,
  Rain: <View testID="rain-icon" />,
};

const mockFiveDayForecast = [
  {
    dt: 1697047200,
    main: { temp: 25 },
    weather: [{ main: "Clear" }],
    isToday: true,
  },
  {
    dt: 1697133600,
    main: { temp: 22 },
    weather: [{ main: "Clouds" }],
    isTomorrow: true,
  },
  {
    dt: 1697220000,
    main: { temp: 20 },
    weather: [{ main: "Rain" }],
  },
];

describe("ForecastSlider Component", () => {
  it("renders the correct number of forecast items", () => {
    const { getAllByTestId } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    const forecastItems = getAllByTestId("forecast-item");
    expect(forecastItems.length).toBe(mockFiveDayForecast.length);
  });

  it("renders 'Today' for the first item", () => {
    const { getByText } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(getByText("Today")).toBeTruthy();
  });

  it("renders 'Tomorrow' for the second item", () => {
    const { getByText } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(getByText("Tomorrow")).toBeTruthy();
  });

  it("renders the correct weekday for the third item", () => {
    const { getByText } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(getByText("Friday")).toBeTruthy();
  });

  it("renders the correct temperature for each item", () => {
    const { getByText } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(getByText("25°C")).toBeTruthy();
    expect(getByText("22°C")).toBeTruthy();
    expect(getByText("20°C")).toBeTruthy();
  });

  it("renders the correct weather icon for each item", () => {
    const { getByTestId } = render(
      <ForecastSlider
        fiveDayForecast={mockFiveDayForecast}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(getByTestId("clear-icon")).toBeTruthy();
    expect(getByTestId("clouds-icon")).toBeTruthy();
    expect(getByTestId("rain-icon")).toBeTruthy();
  });

  it("renders nothing if fiveDayForecast is empty", () => {
    const { queryByTestId } = render(
      <ForecastSlider fiveDayForecast={[]} weatherIcons={mockWeatherIcons} />
    );

    expect(queryByTestId("forecast-item")).toBeNull();
  });

  it("renders nothing if fiveDayForecast is undefined", () => {
    const { queryByTestId } = render(
      <ForecastSlider
        fiveDayForecast={undefined}
        weatherIcons={mockWeatherIcons}
      />
    );

    expect(queryByTestId("forecast-item")).toBeNull();
  });
});
