const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON request bodies;


fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/melbourne?unitGroup=us&key=8B5AUC54ASZU7H9VCRMU3M4AM&contentType=json", {
    method: "GET"
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Convert response to JSON
})
.then(data => {
    console.log("Weather Data:", data); // Log the actual weather data
})
.catch(err => {
    console.error("Fetch Error:", err);
});

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
