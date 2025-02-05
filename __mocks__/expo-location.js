// __mocks__/expo-location.js
export const requestForegroundPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: "granted" })
);
export const getCurrentPositionAsync = jest.fn(() =>
  Promise.resolve({
    coords: { latitude: 37.7749, longitude: -122.4194 },
  })
);
