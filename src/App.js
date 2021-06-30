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

function App() {
  
  const [countries,setCountries] = useState([]);
  const [country,setCountry] =useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);


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
        setTableData(data);
        setCountries(countries);
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
          <Box title = "Covid Cases" cases ={countryInfo.todayCases} total ={countryInfo.cases} />
          <Box title = "Recovered" cases ={countryInfo.todayRecovered} total ={countryInfo.recovered} />
          <Box title = "Deaths" cases ={countryInfo.todayDeaths} total ={countryInfo.deaths} />
        </div>

        <Map />
      </div> 
        <Card className ="right">
          <CardContent>
            <h3>Country according to cases</h3>
            <Table countries={tableData} />
          </CardContent>
          <CardContent>
            <h3>graph will be here</h3>
          </CardContent>
        </Card>

    </div>
  );
}

export default App;
