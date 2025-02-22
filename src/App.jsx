import React, { useEffect, useState } from "react";
import axios from "axios";
import Selector from "./components/Selector";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CiTempHigh } from "react-icons/ci";

const App = () => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [quote, setQuote] = useState("");
  const [city, setCity] = useState("Durban");

  const fetchWeather = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=4e03909d73d64155a33111639252101&q=${city}&days=3`
      )
      .then((res) => {
        setData(res.data);
        const dailyForecast = res.data.forecast.forecastday.map((day) => ({
          date: day.date,
          icon: day.day.condition.icon,
          temp: day.day.avgtemp_c,
          rain: day.day.daily_chance_of_rain,
          condition: day.day.condition.text,
        }));
        setForecast(dailyForecast);
      })
      .catch((err) => {
        console.log("Error fetching weather:", err);
      });
  };

  const fetchQuote = () => {
    axios
      .get("https://zenquotes.io/api/today")
      .then((res) => setQuote(res.data[0].q + " - " + res.data[0].a))
      .catch(() => setQuote("Stay positive and keep moving forward!"));
  };

  useEffect(() => {
    fetchWeather();
    fetchQuote();
  }, [city]);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-5">
      <h1 className="text-3xl font-bold mb-5">Weather App</h1>
      <Selector setCity={setCity} />
      {data ? (
        <div className="mt-5 w-full max-w-4xl">
          <h2 className="text-2xl text-center mb-3">
            {data.location.name}, {data.location.country}
          </h2>
          <div className="flex justify-around mb-5">
            {forecast.map((day) => (
              <div key={day.date} className="text-center">
                <p className="font-semibold">{day.date}</p>
                <img src={day.icon} alt={day.condition} className="mx-auto" />
                <p>{day.temp}°C</p>
                <p>{day.condition}</p>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecast}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="date" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rain"
                stroke="#00d4ff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-5 p-4 bg-blue-800 rounded-lg text-center">
            <h3 className="text-xl mb-2">Quote of the Day</h3>
            <p>{quote}</p>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default App;
