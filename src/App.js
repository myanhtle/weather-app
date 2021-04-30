import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";
const API_KEY = process.env.REACT_APP_api_key;

function App() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [zip, setZip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`
      )
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          // also important to check html error codes
          // 200 means no errors
          setWeather(obj);
        });
    };
    fetchData();
    console.log(weather);
  }, [lon, lat]);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {weather !== null ? (
          <SearchBar
            setZip={setZip}
            zip={zip}
            setLon={setLon}
            setLat={setLat}
          />
        ) : (
          <p>loading</p>
        )}
        {weather !== null ? <Weather weather={weather} /> : <div></div>}
      </div>
    </div>
  );
}
export default App;
