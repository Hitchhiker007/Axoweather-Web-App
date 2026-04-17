import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import FetchWeatherPage from "../fetchWeather";

describe("Page", () => {
  it("fetches data correctly", () => {
    render(<FetchWeatherPage />);
    expect(screen.getByText("Get Weather")).toBeInTheDocument();
  });
  it("displays More Info? button after fetching weather", async () => {
  // 1. mock the fetch to return fake weather data
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      address: "London",
      currentConditions: {
        temp: 72,
        conditions: "Clear",
        icon: "clear-day",
        windspeed: 10,
        humidity: 50,
        pressure: 1013,
      },
      days: [],
    }),
  } as any);

  // 2. render component
  render(<FetchWeatherPage />);

  // 3. type a location "London"
  fireEvent.change(screen.getByPlaceholderText("Enter location"), {
    target: { value: "London" },
  });

  // 4. click get weather
  fireEvent.click(screen.getByRole('button', { name: /get weather/i }))

  // 5. Check More Info? appears
  expect(await screen.findByText("More Info?")).toBeInTheDocument();
});
});
