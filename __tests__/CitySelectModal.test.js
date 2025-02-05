import { render, fireEvent } from "@testing-library/react-native";
import CitySelectModal from "@/components/CitySelectModal";
import EarthIcon from "@/assets/icons/cities/EarthIcon";

jest.mock("@/assets/icons/cities/EarthIcon", () => "EarthIcon");

const mockCities = [
  {
    name: "New York",
    icon: <EarthIcon width={32} height={32} />,
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "London",
    icon: <EarthIcon width={32} height={32} />,
    lat: 51.5074,
    lon: -0.1278,
  },
];

describe("CitySelectModal Component", () => {
  it("renders the modal correctly when visible", () => {
    const { getByText, getByTestId } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={true}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    expect(getByText("Select a City")).toBeTruthy();

    expect(getByTestId("city-list")).toBeTruthy();

    expect(getByText("Close")).toBeTruthy();
  });

  it("renders the list of cities including 'My Location'", () => {
    const { getByText } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={true}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    expect(getByText("New York")).toBeTruthy();
    expect(getByText("London")).toBeTruthy();

    expect(getByText("My Location")).toBeTruthy();
  });

  it("calls handleCitySelection when a city is selected", () => {
    const handleCitySelection = jest.fn();
    const { getByText } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={true}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={handleCitySelection}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    fireEvent.press(getByText("New York"));

    expect(handleCitySelection).toHaveBeenCalledWith(mockCities[0]);
  });

  it("calls handleUseCurrentLocation when 'My Location' is selected", () => {
    const handleUseCurrentLocation = jest.fn();
    const { getByText } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={true}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={handleUseCurrentLocation}
      />
    );

    fireEvent.press(getByText("My Location"));

    expect(handleUseCurrentLocation).toHaveBeenCalled();
  });

  it("calls setCityModalVisible when the 'Close' button is pressed", () => {
    const setCityModalVisible = jest.fn();
    const { getByText } = render(
      <CitySelectModal
        setCityModalVisible={setCityModalVisible}
        cityModalVisible={true}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    fireEvent.press(getByText("Close"));

    expect(setCityModalVisible).toHaveBeenCalledWith(false);
  });

  it("renders nothing when cityModalVisible is false", () => {
    const { queryByText } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={false}
        DEFAULT_CITIES={mockCities}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    expect(queryByText("Select a City")).toBeNull();
  });

  it("handles empty DEFAULT_CITIES gracefully", () => {
    const { getByText } = render(
      <CitySelectModal
        setCityModalVisible={jest.fn()}
        cityModalVisible={true}
        DEFAULT_CITIES={[]}
        handleCitySelection={jest.fn()}
        handleUseCurrentLocation={jest.fn()}
      />
    );

    expect(getByText("My Location")).toBeTruthy();
  });
});
