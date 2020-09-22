import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [capital, setCapital] = useState([])

  useEffect(() => {
  axios
      .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+props.filtered[0].capital)
      .then(response => {
        setCapital(response.data)
        setLoading(false)
      })
    }, [])

    if (isLoading){
      return <div> Loading data....</div>
    }

    return (
      props.filtered.map(country => 
        <div>
        <h1 key={country.name}>{country.name} </h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
          <li key ={language.name}>{language.name}</li>)}
          </ul>
        <img src ={country.flag } width="200" alt={country.name}></img>
        <h2><b>Weather in {capital.location.name}</b></h2>
        <p><b>temperature:</b> {capital.current.temperature} celcius</p>
        <img src ={capital.current.weather_icons} width="80" alt={country.name}></img>
        <p><b>wind: </b>{capital.current.wind_speed} mph direction {capital.current.wind_dir}</p>
        </div>
        ) 
    )

}

const Result = (props) => {
  const filtered = props.countries.filter(function (country) { return country.name.toLowerCase().includes(props.keyWord.toLowerCase())})
  if(filtered.length === 1){
    return (
      <Country filtered={filtered}></Country>
    )
  }
  if(filtered.length <= 10){
    return(
      filtered.map(country => 
        <div>
        <p key={country.name}>{country.name} <button value ={country.name} onClick={function (e) {props.setKeyWord(e.target.value)}}>show</button></p> 
        </div>)
    )
  }
    return(
      <p>Too many matches, specify another filter</p>
    )
}

function App() {
  const [keyWord, setKeyWord] = useState("")
  const [countries, setCountries] = useState([])
  const handleKeyWordChange = (event) => {
    setKeyWord(event.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div >
      find countries <input value = {keyWord} onChange={handleKeyWordChange}></input>
      
      <Result countries ={countries} keyWord ={keyWord} setKeyWord={setKeyWord}  />
   
    </div>
  );
}

export default App;
