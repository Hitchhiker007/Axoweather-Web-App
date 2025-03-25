import React, {useState} from "react";

function fetchWeather() {

    const [location, setLocation] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);

    const fetchCurrentWeather = async (location: string) => {
        const apiKey = '8B5AUC54ASZU7H9VCRMU3M4AM';
        const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
        const url = `${baseUrl}${location}?unitGroup=us&key=${apiKey}&contentType=json`;
    

    try {
        const response = await fetch(url, {method: "GET"});

        if (!response.ok) {
            throw new Error('Network response not ok.')
        }

        const data = await response.json();
      setWeather(data); // Update the state with the weather data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } 

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCurrentWeather(location); // Fetch the weather based on user input
  };

return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update location state
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.currentConditions.temp}°F</p>
          <p>Condition: {weather.currentConditions.conditions}</p>
        </div>
      )}
    </div>
  );
}

export default fetchWeather