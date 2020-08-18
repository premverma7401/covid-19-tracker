import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card } from '@material-ui/core';
import { sortData, prettyPrintStat } from '../utils';
import InfoBox from '../components/InfoBox';
import Map from '../components/Map';
import Table from '../components/TableData';
import LineGraph from '../components/LineGraph';
import '../styles/App.css';
import 'leaflet/dist/leaflet.css';
import TableData from '../components/TableData';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [tableData, setTableData] = useState([]);
  const [countryInfo, setcountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  const baseUrl = 'https://disease.sh/v3/covid-19';

  useEffect(() => {
    const fetchCountriesList = async () => {
      await fetch(baseUrl + '/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedDataByCases = sortData(data);
          setTableData(sortedDataByCases);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    fetchCountriesList();
  }, []);

  useEffect(() => {
    const fetchWorldwideData = async () => {
      await fetch(baseUrl + '/all')
        .then((response) => response.json())
        .then((data) => {
          setcountryInfo(data);
        });
    };
    fetchWorldwideData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    // Country Data
    const url =
      countryCode === 'worldwide'
        ? baseUrl + '/all'
        : baseUrl + `/countries/${countryCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
        countryCode === 'worldwide'
          ? setMapCenter({
              lat: 20.5937,
              lng: 78.9629,
            })
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <div className="app">
      <div className="app_left">
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
        <div className="app_stats">
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Coronovirus Cases"
            total={prettyPrintStat(countryInfo.cases)}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            total={prettyPrintStat(countryInfo.recovered)}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            total={prettyPrintStat(countryInfo.deaths)}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <div className="app_map">
          <Map
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            casesType={casesType}
          />
        </div>
      </div>
      <div className="app_right">
        <div className="table-data">
          <Card>
            <h3>Live cases by countries</h3>
            <TableData countries={tableData} />
          </Card>
        </div>
        <Card className="app_right_card2">
          <h3>worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </Card>
      </div>
    </div>
  );
}

export default App;
