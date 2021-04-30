import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function Weather({ weather }) {
  const [weekForcast, setWeekForcast] = useState([]);
  const [hourForcast, setHourForcast] = useState([]);
  const [isDaily, setIsDaily] = useState(true);

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
    }));
    setWeekForcast(dailyForcast);
  };

  const hourlyWeather = (hours) => {
    const hourlyForcast = hours.map((h) => ({
      time: unixToHour(h.dt),
      temp: h.temp,
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
          margin: "10px",
        }}
      >
        {hourForcast.map((h) => (
          <div style={{ margin: "20px" }}>
            <h3>{h.time}</h3>
            <p>{h.temp}°F</p>
          </div>
        ))}
      </div>
    </div>
  );

  const weeklyForcast = (
    <div>
      <div style={{ textAlign: "center" }}>
        {weekForcast.map((d) => (
          <div>
            <h3>{d.date}</h3>
            <p>{d.temp}°F</p>
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
