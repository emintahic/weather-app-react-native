import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from "../app/(home)/index";
import axios from "axios";
import * as Location from "expo-location";

jest.mock("axios");
jest.mock("expo-location");

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders weather data after fetching", async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: "granted",
    });

    Location.getCurrentPositionAsync.mockResolvedValueOnce({
      coords: { latitude: 43.8563, longitude: 18.4131 },
    });

    axios.get
      .mockResolvedValueOnce({
        data: {
          weather: [{ main: "Clear", description: "clear sky" }],
          main: { temp: 25 },
          name: "Sarajevo",
          timezone: 7200,
          sys: {
            sunrise: 1698226800,
            sunset: 1698268800,
          },
          wind: { speed: 5.5 },
        },
      })
      .mockResolvedValueOnce({
        data: {
          list: [
            {
              dt: 1633072800,
              main: { temp: 20 },
              weather: [{ description: "clear sky" }],
            },
          ],
        },
      });

    const { getByText, getByTestId } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByTestId("home-screen")).toBeTruthy();
      expect(getByText("Sarajevo")).toBeTruthy();
      expect(getByText("25°")).toBeTruthy();
    });
  });

  it("handles location permission denial", async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: "denied",
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Loading weather data...")).toBeTruthy();
    });
  });
});
