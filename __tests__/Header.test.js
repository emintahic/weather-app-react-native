import { render, fireEvent } from "@testing-library/react-native";
import Header from "../components/Header";

jest.mock("@/components/LocationButton", () => {
  return jest.fn(({ setCityModalVisible }) => (
    <button onPress={() => setCityModalVisible(true)} testID="location-button">
      LocationButton
    </button>
  ));
});

const mockWeatherData = {
  timezone: -14400,
  name: "New York",
};

describe("Header Component", () => {
  it("renders the correct local time based on the timezone", () => {
    const { getByText } = render(
      <Header weatherData={mockWeatherData} setCityModalVisible={jest.fn()} />
    );

    const timezoneOffset = mockWeatherData.timezone;
    const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
    const expectedTime = `${localTime
      .getUTCHours()
      .toString()
      .padStart(2, "0")}:${localTime
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;

    expect(getByText(expectedTime)).toBeTruthy();
  });

  it("renders the location name from weatherData", () => {
    const { getByText } = render(
      <Header weatherData={mockWeatherData} setCityModalVisible={jest.fn()} />
    );

    expect(getByText("New York")).toBeTruthy();
  });

  it("renders 'Unknown Location' if weatherData is undefined", () => {
    const { getByText } = render(
      <Header weatherData={undefined} setCityModalVisible={jest.fn()} />
    );

    expect(getByText("Unknown Location")).toBeTruthy();
  });

  it("renders the LocationButton and triggers setCityModalVisible when clicked", () => {
    const mockSetCityModalVisible = jest.fn();
    const { getByTestId } = render(
      <Header
        weatherData={mockWeatherData}
        setCityModalVisible={mockSetCityModalVisible}
      />
    );

    const locationButton = getByTestId("location-button");
    fireEvent.press(locationButton);

    expect(mockSetCityModalVisible).toHaveBeenCalledWith(true);
  });

  it("renders the horizontal line separator", () => {
    const { getByTestId } = render(
      <Header weatherData={mockWeatherData} setCityModalVisible={jest.fn()} />
    );

    expect(getByTestId("separator-line")).toBeTruthy();
  });
});
