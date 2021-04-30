import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const API_KEY = process.env.REACT_APP_api_key;

export default function SearchBar({ setZip, zip, lon, setLon, lat, setLat }) {
  const [myZip, setMyZip] = useState("");

  useEffect(() => {
    fetchLongLat();
  }, [zip]);

  const fetchLongLat = () => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("zip", zip);
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setLon(obj.coord.lon);
          setLat(obj.coord.lat);
        } else {
          setLat(0);
          setLon(0);
        }
      });
  };

  const handleChange = (e) => setMyZip(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setZip(myZip);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>
          <TextField
            type="text"
            id="new-note"
            label="Enter zipcode"
            placeholder="e.g. 23601"
            size="small"
            autoComplete="off"
            value={myZip}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            Search
          </Button>
        </h3>
      </form>
    </div>
  );
}
