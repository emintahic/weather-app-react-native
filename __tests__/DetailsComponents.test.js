import { render } from "@testing-library/react-native";
import DetailsComponents from "@/components/DetailsComponents";

jest.mock("@/components/DetailsCard", () => {
  const { View, Text } = jest.requireActual("react-native");
  return jest.fn(({ icon, title, unit, value }) => (
    <View testID="details-card">
      {icon}
      <Text testID="details-card-title">{title}</Text>
      <Text testID="details-card-value">
        {value}
        {unit}
      </Text>
    </View>
  ));
});

const mockWeatherData = {
  clouds: { all: 75 },
  main: {
    pressure: 1013,
    temp_min: 15,
    temp_max: 25,
  },
};

describe("DetailsComponents Component", () => {
  it("renders the correct details with weatherData", () => {
    const { getAllByTestId, getByText } = render(
      <DetailsComponents weatherData={mockWeatherData} />
    );

    const detailsCards = getAllByTestId("details-card");
    expect(detailsCards.length).toBe(4);

    expect(getByText("75%")).toBeTruthy();
    expect(getByText("1013hpa")).toBeTruthy();
    expect(getByText("15°C")).toBeTruthy();
    expect(getByText("25°C")).toBeTruthy();
  });

  it("renders the correct titles and units", () => {
    const { getAllByTestId } = render(
      <DetailsComponents weatherData={mockWeatherData} />
    );

    const titles = getAllByTestId("details-card-title");
    const units = getAllByTestId("details-card-value");

    expect(titles[0].props.children).toBe("Cloud Cover");
    expect(units[0].props.children).toContain("%");

    expect(titles[1].props.children).toBe("Pressure");
    expect(units[1].props.children).toContain("hpa");

    expect(titles[2].props.children).toBe("Min. Temp.");
    expect(units[2].props.children).toContain("°C");

    expect(titles[3].props.children).toBe("Max. Temp.");
    expect(units[3].props.children).toContain("°C");
  });

  it("renders correct icons", () => {
    const { getByTestId } = render(
      <DetailsComponents weatherData={mockWeatherData} />
    );

    expect(getByTestId("cloud-icon")).toBeTruthy();
    expect(getByTestId("pressure-icon")).toBeTruthy();
  });
});
