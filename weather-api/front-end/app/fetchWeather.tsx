import React, {useState} from "react";
import Image from "next/image";
import "./forecast-cards.css";

function fetchWeather() {

    const [location, setLocation] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null); 
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const [forecast, setForecast] = useState<any[]>([]);
    const [weatherPressed, setWeatherPressed] = useState(false);
    const [forecastPressed, setForecastPressed] = useState(false);

    const handleMoreInfoClick = () => {
        setShowMoreInfo((prevState:any) => !prevState);
    };

    const handleMoreInfoClickReset = () => {
        setShowMoreInfo((prevState:any) => false);
    }           

    const handleWeatherInfo = () => {
        setWeather((prevState:any) => false);
    }

    // farenheit to celcius conversion
    const celciusConversion = (farenheit: number) => Math.round((farenheit - 32) * 5 / 9);

    const fetchCurrentWeather = async (location: string, options?: { onlyForecast?: boolean }) => {
        if (location === "") {
            console.log("Empty location");
            handleWeatherInfo();
            return;
          }
          try {
            const res = await fetch('/api/weather', {
              method: 'POST',
              body: JSON.stringify({ location }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

                const data = await res.json();

        if (!data) {
            console.log("No data returned");
            return;
        }
        console.log(data.currentConditions.icon)
        // Correctly update the image based on the weather condition
        const conditions = data.currentConditions.conditions || "";
        const icon = data.currentConditions.icon || "";

        if (conditions === "Partially cloudy") {
            setImage("/cloudy.png");
        } else if (conditions === "Overcast") {
            setImage("/overcast.png");
        } else if (conditions.includes("Rain")) {
            setImage("/rain.png");
        } else if (icon.includes("clear-day") || conditions.toLowerCase().includes("clear")) {
            setImage("/clear_day.png");
        } else if (icon.includes("clear-night")) {
            setImage("/clear_night.png");
        } else if (icon.includes("fog")) {
            setImage("/fog.png");
        } else if (conditions.includes("thunderstorm")) {
            setImage("/thunderstorm.png");
        } else if (conditions.includes("wind")) {
            setImage("/wind.png");
        } else {
            // fallback if nothing matches
            setImage("/clear_day.png"); // optional: default to clear day icon
        }
      // populate forecast in state
      setForecast(get15DayForecast(data));
      // convert the temp recieved from api to celcius
      if (!options?.onlyForecast && data.currentConditions?.temp != null) {
        const farenheit = Number(data.currentConditions.temp);
        data.currentConditions.temp = celciusConversion(farenheit); 
      }

      // Update the state with the weather data
      setWeather(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   // forecast button handler that reads from state
  const handleForecastClick = () => {
    setForecastPressed(true);
    setWeatherPressed(false);
    if (!weather) {
      // if  user hasnt fetched todays weather yet fetch it first
      fetchCurrentWeather(location, { onlyForecast: true});
      return;
    }
    // forecast state already populated
    console.log("15-day forecast:", forecast);
  };


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWeatherPressed(true);    
    setForecastPressed(false);
    fetchCurrentWeather(location);
  };
  

return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-left">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update location state
          className="h-10 sm:h-12 px-4 sm:px-5 text-sm sm:text-base border border-solid border-gray-300  max-w-50" 
        />
        <button className="border border-solid border-transparent transition-colors flex items-center 
        justify-center bg-foreground text-background gap-2 hover:bg-[#383838] 
        dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto max-w-50" 
        type="submit" onClick={handleMoreInfoClickReset}> 
        <Image
                      src="/search.png"
                      alt="Search icon"
                      className="button-icon"
                      width={20}
                      height={20}
                    />Get Weather</button>

          {/* The forecast button calls handleForecast directly */}
        <button
          className="border border-solid border-transparent transition-colors flex items-center 
          justify-center bg-foreground text-background gap-0.3 hover:bg-[#383838] 
          dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto max-w-50"
          type="button"
          onClick={handleForecastClick} // pass string value from the textbox
        >
          <Image src="/title.png" className="button-icon" alt="Search icon" width={48} height={48} />
          Get Forecast
        </button>
      </form>

      {weatherPressed && weather?.currentConditions && (
         <div className="flex justify-between items-center gap-25"> {/* Flex container for two sections */}
         {/* Left section: Image and Weather Data */}
         <div className="flex flex-col gap">
           {/* <h2>{weather.city}</h2> */}
           {image && <img src={image}  className="big-weather-icon" alt="Weather Icon" width={180} height={38} />}
           <p>Location: {weather.address}</p>
           <p>Temperature: {weather.currentConditions.temp}°C</p>
           <p>Condition: {weather.currentConditions.conditions}</p>
           {/* Conditionally show more info */}
           {showMoreInfo && (
          <div className="mt-4">
            <p>Wind: {weather.currentConditions.windspeed} km/h</p>
            <p>Humidity: {weather.currentConditions.humidity}%</p>
            <p>Pressure: {weather.currentConditions.pressure} hPa</p>
          </div>
        )}
         </div>

         {/* Right section: "More Info?" Button */}
         <div className="flex justify-center items-center">
           <button className="border border-solid border-transparent transition-colors flex items-center 
             justify-center bg-foreground text-background gap-2 hover:bg-[#383838] 
             dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto" 
             type="button" onClick={handleMoreInfoClick}>{showMoreInfo ? "Less Info" : "More Info?"}</button>
         </div>
       </div>
      )}
      {/* Forecast display */}
         {forecastPressed && forecast.length > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              {[0, 7].map((start) => (
                <div key={start} className="flex gap-4 justify-start flex-wrap">
                  {forecast.slice(start, start + 7).map((day, idx) => {
                    const dateObj = new Date(day.date);
                    const dayOfMonth = String(dateObj.getDate()).padStart(2, '0');
                    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    const weekday = weekdayNames[dateObj.getDay()];
                    return (
                      <div key={idx} className="forecast-card group">
                        <p>{dayOfMonth} - {weekday}</p>
                        <p>{day.condition}</p>
                        {getWeatherIcon(day.condition, day.icon) && (
                          <img
                            src={getWeatherIcon(day.condition, day.icon)}
                            alt={day.condition}
                            className="weather-icon"
                            width={40}
                            height={40}
                          />
                        )}
                        <p>{day.tempC}°C</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
    </div>
  );
}

export default fetchWeather

// format helper
const get15DayForecast = (weatherData: any) => {
  if (!weatherData || !weatherData.days) return [];
  return weatherData.days.map((day: any) => ({
    date: day.datetime,
    condition: day.conditions,
    tempC: Math.round(((day.temp - 32) * 5) / 9),
    wind: day.windspeed,
    humidity: day.humidity,
    pressure: day.pressure,
  }));
};

const getWeatherIcon = (conditions: string, icon?: string) => {
  const cond = conditions.toLowerCase();

  if (cond.includes("partially cloudy")) return "/cloudy.png";
  if (cond.includes("overcast")) return "/overcast.png";
  if (cond.includes("rain")) return "/rain.png";
  if (cond.includes("clear")) return "/clear_day.png";
  if (icon && icon.includes("clear-day")) return "/clear_day.png";
  if (icon && icon.includes("clear-night")) return "/clear_night.png";
  if (icon && icon.includes("fog")) return "/fog.png";
  if (cond.includes("thunderstorm")) return "/thunderstorm.png";
  if (cond.includes("wind")) return "/wind.png";

  return "/clear_day.png"; // fallback to clear day
};
