import { useState,useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core"
import './App.css';

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


            {/* <MenuItem value="uk">uk</MenuItem>
            <MenuItem value="uk">uk</MenuItem>
            <MenuItem value="uk">uk</MenuItem> */}
          </Select>
        </FormControl>
      </div>


    </div>
  );
}

export default App;
