import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { nanoid } from "nanoid";

export default function Weather({ weather }) {
  const [weekForcast, setWeekForcast] = useState([]);
  const [hourForcast, setHourForcast] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const iconCodes = [
    ["2", "11d"],
    ["3", "09d"],
    ["5", "10d"],
    ["6", "13d"],
    ["7", "50d"],
    ["8", "03d"],
    ["800", "01d"],
  ];
  const codeMap = new Map(iconCodes);

  useEffect(() => {
    dailyWeather(weather.daily);
    hourlyWeather(weather.hourly);
  }, [weather]);

  const unixToDate = (time) => {
    const unixTime = time;
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString("en-US");
  };

  const unixToHour = (time) => {
    const unixTime = time;
    const regularTime = new Date(unixTime * 1000);
    const hours = ((regularTime.getHours() + 11) % 12) + 1;
    const minutes = "0" + regularTime.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);
    const suffix = regularTime.getHours() >= 12 ? "pm" : "am";
    return formattedTime + suffix;
  };

  const dailyWeather = (days) => {
    const dailyForcast = days.map((d) => ({
      date: unixToDate(d.dt),
      temp: d.temp.day,
      id: d.weather[0].id.toString(),
    }));
    setWeekForcast(dailyForcast);
  };

  const hourlyWeather = (hours) => {
    const hourlyForcast = hours.map((h) => ({
      time: unixToHour(h.dt),
      temp: h.temp,
      id: h.weather[0].id.toString(),
    }));
    setHourForcast(hourlyForcast);
  };

  const hourlyForcast = (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "20px",
          borderStyle: "solid",
        }}
      >
        {hourForcast.map((h) => (
          <div style={{ margin: "20px" }}>
            <h3>{h.time}</h3>
            {h.id === "800" ? (
              <img
                src={`http://openweathermap.org/img/wn/${codeMap.get(
                  "800"
                )}@2x.png`}
                key={nanoid()}
              />
            ) : (
              <img
                src={`http://openweathermap.org/img/wn/${codeMap.get(
                  h.id.substring(0, 1)
                )}@2x.png`}
              />
            )}
            <p>{h.temp}°F</p>
          </div>
        ))}
      </div>
    </div>
  );

  const weeklyForcast = (
    <div>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          borderStyle: "solid",
          margin: "20px",
        }}
      >
        {weekForcast.map((d) => (
          <div style={{ padding: "20px", borderStyle: "solid" }}>
            <h3>{d.date}</h3>
            {d.id === "800" ? (
              <img
                src={`http://openweathermap.org/img/wn/${codeMap.get(
                  "800"
                )}@2x.png`}
                key={nanoid()}
              />
            ) : (
              <img
                src={`http://openweathermap.org/img/wn/${codeMap.get(
                  d.id.substring(0, 1)
                )}@2x.png`}
              />
            )}
            <p>{d.temp}°F</p>
            {}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <h1>Current Weather is {weather.current.temp}°F</h1>
      <div>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={() => setIsDaily(false)}>Hourly</Button>
          <Button onClick={() => setIsDaily(true)}>7 Day Forcast</Button>
        </ButtonGroup>
      </div>
      {isDaily ? weeklyForcast : hourlyForcast}
    </div>
  );
}
