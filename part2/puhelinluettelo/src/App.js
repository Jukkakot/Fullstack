import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Persons = (props)=> {
  return(
    props.persons.filter(function (person) { return person.name.toLowerCase().includes(props.filter.toLowerCase())}).map(person => 
      <p key={person.name}>{person.name} {person.number}</p> 
    )
  )
}

const Filter = (props) => {
  return (
<div>filter shown with <input  onChange={props.handleFilterChange} /></div> 
  )
}
const PersonForm = (props) =>  {
  return (
    <form onSubmit ={props.onSubmit}>
      <div> name: <input value ={props.newName} onChange ={props.handleNameChange}/> </div>
      <div> number: <input value ={props.newNumber} onChange= {props.handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}
const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState("")
  const [newNumber,setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onSubmit = event =>{
    event.preventDefault()
    if(!persons.some(person => person.name === newName)){
      const copy = [...persons]
      copy.push({name: newName, number: newNumber})
      setPersons(copy)
      setNewName("")
      setNewNumber("")
    } else {
      alert (`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    } 
  }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter= {filter} handleFilterChange ={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                  newNumber = {newNumber}
                  newName = {newName}
                  onSubmit ={onSubmit}/>
      <h2>Numbers</h2>
      <Persons persons ={persons} filter ={filter} />
    </div>
  )

}

export default App