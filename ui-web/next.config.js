/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WEATHER_API:
      'http://api.weatherapi.com/v1/forecast.json?key=a45891cb84e847a488e33925232208&q=HaNoi&days=1&aqi=no&alerts=no',
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
