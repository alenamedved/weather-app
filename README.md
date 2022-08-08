# Weather App
It is a weather-forecasting application that takes geographic US latitude/longitude values as input and presents the weather from a point in time at the given location(s)

The weather data retrieved from [https://api.weather.gov] (https://api.weather.gov)

Built with React, JavaScript, MUI.


## Project Screen Shot(s)
Example of successfull request
![Seven days forecast will be displayed](https://postimg.cc/XZXhfwTq)

## Installation and Setup Instructions
To run this project on you local mashin you will need Terminal, Git version control ans Node.js, a programming environment powered by JavaScript. 
- Clone this repository by entering this command ```https://github.com/alenamedved/weather-app.git``` into your command line application: git clone . It will create a version controlled copy of the website in the directory you entered the command in.
- Navigate into the project's root directory by typing ```cd weather-app``` in your command line application
- Install the project's Node.js modules by typing ```npm install``` into your command line application. A list of these modules should be displayed after they are downloaded and installed.

After cloning and installing project Node.js modules, type ```npm start``` into your command line application. This will tell Node.js to compile the project and turn it into a website.

To Visit App:
```http://localhost:3000/```

To quit press  ```Control``` and ```C``` keys at the same time in your command line application, or by closing the command line application window or tab.

To build the app
```npm run build```
Builds the app for production to the `build` folder.\

## Usage
The application accepts two imputs from the user: one for latitude another one for longitude.
Latitude should be in the range of-90-90.
Longitude should be in the range of-180-180.
Applicaton won't accept the other range and will throw an notification.
To send a request to the https://api.weather.gov used a  /points endpoint to retrieve the exact grid endpoint by coordinates
https://api.weather.gov/points/{latitude},{longitude}
For example: https://api.weather.gov/points/39.7456,-97.0892
This will return the grid endpoint in the "forecast" property. This endpoint also tells the application where to find information for issuing office, observation stations, and zones.
In case if no data was retrived or an error happend the user will recieve an notification with error message.

## Reflection
This was a two day project practicing in React, working with API and MUI for styling.

Originally I wanted to build an application that allowed users to pull data from the [Weather API](https://api.weather.gov) based on latitude and longitude. I started this process by using the create-react-app boilerplate, then adding axios for sending requests, MUI library for styling.

At the end of the day, the technologies implemented in this project are React, JavaScript, JSX, and MUI. I chose to use the create-react-app boilerplate to minimize initial setup and invest more time working on functionality. In the next iteration I plan to continue to work more on styling to make the app more attractive for potential users.

