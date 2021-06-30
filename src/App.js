import { useState,useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core"
import './App.css';
import Box from './Box.js';

function App() {
  
  const [countries,setCountries] = useState([]);
  const [country,setCountry] =useState("worldwide");
  useEffect(()=>{

    const getcountryData = async ()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then(response=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo
        }))
        setCountries(countries);
      })
    }

    getcountryData();

  },[])

  const countryChange = ((event)=>{
    const countryCode=event.target.value; 
    setCountry(countryCode);
  })


  return (
    <div className="app">
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
        <Box title = "Covid Cases" cases ={291} total ={132} />
        <Box title = "Recovered" cases ={291} total ={132} />
        <Box title = "Deaths" cases ={291} total ={132} />
      </div>

    </div>
  );
}

export default App;
