import React, {useState} from "react";
import Image from "next/image";

function fetchWeather() {

    const [location, setLocation] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null); // Ensure it's st


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

        console.log(data.currentConditions.icon)
        // Convert temperature to Celsius before updating the state
        if (data.currentConditions && data.currentConditions.temp !== undefined) {
            data.currentConditions.temp = Math.round(((data.currentConditions.temp - 32) * 5) / 9);
        }
        // Correctly update the image based on the weather condition
        if (data.currentConditions.conditions === "Partially cloudy") {
            setImage("/cloudy.png");} // Use setImage, not direct assignment
        else if(data.currentConditions.conditions === "Overcast"){
            setImage("/overcast.png");}
        else if(data.currentConditions.conditions.includes("Rain")){
            setImage("/rain.png");}
        else if(data.currentConditions.icon.includes("clear-day")){
            setImage("/clear_day.png");}
        else  if(data.currentConditions.icon.includes("clear-night")){
            setImage("/clear_night.png");}
        else  if(data.currentConditions.icon.includes("fog")){
            setImage("/fog.png");}
        else  if(data.currentConditions.conditions.include("thunderstorm")){
            setImage("/thunderstorm.png");}
        else  if(data.currentConditions.conditions.include("wind")){
            setImage("/wind.png");}
        else {
            setImage(null); // Reset if condition doesn't match
        }

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
        <button className="rounded-full border border-solid border-transparent transition-colors flex items-center 
        justify-center bg-foreground text-background gap-2 hover:bg-[#383838] 
        dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto" 
        type="submit"> <Image
                      className="dark:invert"
                      src="/vercel.svg"
                      alt="Vercel logomark"
                      width={20}
                      height={20}
                    />Get Weather</button>
      </form>

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          {image && <img src={image} className="dark:invert" alt="Weather Icon" width={180}
          height={38} />}
          <p>Location: {location}</p>
          <p>Temperature: {weather.currentConditions.temp}°C</p>
          <p>Condition: {weather.currentConditions.conditions}</p> 
        </div>
      )}
    </div>
  );
}

export default fetchWeather