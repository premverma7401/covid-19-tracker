import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Container } from '@material-ui/core';
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setcountry] = useState('worldwide');

  useEffect(() => {
    const fetchCountriesList = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    fetchCountriesList();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setcountry(countryCode);
  };
  return (
    <div className="app">
      <Container>
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Container>
    </div>
  );
}

export default App;
