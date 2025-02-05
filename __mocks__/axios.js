// __mocks__/axios.js
export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        weather: [{ main: "Clear", description: "clear sky" }],
        main: { temp: 20 },
        name: "San Francisco",
        timezone: -25200,
      },
    })
  ),
};
