# Weather React App

## Introduction
Welcome to the Weather React App, a web application designed to provide real-time weather information using the OpenWeatherMap API. This React-based project leverages modern web development technologies, including React Router, Redux, and Tailwind CSS, to create an interactive and user-friendly weather forecasting experience. Users can easily access current weather data, historical searches, and detailed weather forecasts.

## Features

### Weather Search
- On the initial page load, users are prompted to enter a location name or retrieve weather information for their current location.
- Weather data for the requested area is fetched and displayed in a user-friendly format.

### Cities Page
- Users can search for any city or country, and the app stores brief information about the searched location using React Redux.
- The data is persistently stored on the client-side in React's persistent state, ensuring easy access to historical weather searches.
- Users can view detailed weather information for a city from their search history by clicking the "See More" button next to the item.

### Forecast Page
- The "Forecast" page allows users to enter the name of an area and specify the number of days they want a weather forecast for.
- Detailed weather parameters are fetched and presented in a tabular format, offering valuable insights into upcoming weather conditions.

### UI Design
- The project's user interface is designed using Tailwind CSS, providing a clean and visually appealing user experience.
- Tailwind CSS classes are utilized for responsive and modern styling.

## Getting Started
To run this project on your local machine, follow these simple steps:
1. Clone the repo from GitHub:

```
git clone https://github.com/Hamzah-Manzoor/weather-react-app.git
```

2. Navigate to the project directory:
```
cd weather-react-app
```

3. Install all the dependencies using:
```
npm i
```

4. To run the project, run the command:
```
npm start
```

Open your web browser and access the Weather React App at http://localhost:3000.

## Contributing
Contributions to this project are welcome! Feel free to submit issues, suggest enhancements, or even create pull requests to improve the Weather React App.

## Acknowledgments
This project utilizes the OpenWeatherMap API to provide accurate and up-to-date weather information. Special thanks to OpenWeatherMap for their valuable services.