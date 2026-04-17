import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import FetchWeatherPage from "../fetchWeather";

describe("FetchWeather", () => {
  it("renders Get Weather button", () => {
    render(<FetchWeatherPage />);
    expect(screen.getByRole('button', { name: /get weather/i })).toBeInTheDocument();
  });

  it("displays More Info? button after fetching weather", async () => {
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

    render(<FetchWeatherPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter location"), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByRole('button', { name: /get weather/i }));

    expect(await screen.findByText("More Info?")).toBeInTheDocument();
  });

  it("shows error message when API returns no data", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => null,
    } as any);

    render(<FetchWeatherPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter location"), {
      target: { value: "FakeCity" },
    });
    fireEvent.click(screen.getByRole('button', { name: /get weather/i }));

    expect(await screen.findByText("No location found")).toBeInTheDocument();
  });
});