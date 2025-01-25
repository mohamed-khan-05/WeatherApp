import React, { useEffect, useState } from "react";
import axios from "axios";
import Selector from "./components/Selector";

// media
import { CiTempHigh } from "react-icons/ci";

const App = () => {
  const [data, setData] = useState("");
  const [city, setCity] = useState("Durban");
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=4e03909d73d64155a33111639252101&q=${city}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(error);
      });
  }, [city]);
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center">
      <h1 className="absolute top-5 text-[1.4rem]">Weather App</h1>
      <Selector setCity={setCity} />
      {data ? (
        <div className="self-center translate-y-[-100px] text-[1.2rem] bg-cyan-200 p-[100px] rounded-lg">
          <h1>{data.location.country}</h1>
          <h1>{data.location.name}</h1>
          <h2>{data.location.region}</h2>
          <div className="flex items-center">
            <h1>{data.current.temp_c}</h1>
            <CiTempHigh />
          </div>

          <div>
            <h1>{data.current.condition.text}</h1>{" "}
            <img src={data.current.condition.icon} alt="" />
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default App;
