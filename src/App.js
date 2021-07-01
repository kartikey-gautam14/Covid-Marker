import { useState,useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core"
import './App.css';
import Box from './Box.js';
import Map from './Map.js';
import Table from './Table';
import {sortData} from './utility';
import Graph from './Graph.js';
import "leaflet/dist/leaflet.css";


function App() {
  
  const [countries,setCountries] = useState([]);
  const [country,setCountry] =useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937 , lng: 78.9629  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(()=>{

    const getcountryData = async ()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then(response=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        let sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      })
    }

    getcountryData();

  },[])

  const countryChange = (async(event)=>{
    const countryCode=event.target.value; 
    console.log("kjdnuv  ",countryCode);

    const url =countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });

  })
  console.log(countryInfo);

  return (
    <div className="app">
      <div className = "left">
        <div className="app_header">
          <h1>Covid Marker</h1>

          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={countryChange} value={country}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map(country=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            </Select>

          </FormControl>
        </div>
        <div className ="app_stat">
          <Box  onClick={(e) => setCasesType("cases")}
          title = "Covid Cases" cases ={countryInfo.todayCases} total ={countryInfo.cases}  />
          <Box onClick={(e) => setCasesType("recovered")}
          title = "Recovered" cases ={countryInfo.todayRecovered} total ={countryInfo.recovered} />
          <Box onClick={(e) => setCasesType("deaths")}
          title = "Deaths" cases ={countryInfo.todayDeaths} total ={countryInfo.deaths} />
        </div>

        <Map  countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}
        />
      </div> 
        <Card className ="right">
          <CardContent>
            <h3>Country according to cases</h3>
            <Table countries={tableData} />
          </CardContent>
          <CardContent>
            <h3>Worldwide new {casesType}</h3>
            <Graph casesType={casesType} />
          </CardContent>
        </Card>

    </div>
  );
}

export default App;
