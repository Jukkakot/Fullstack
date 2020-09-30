import React, { useState, useEffect } from 'react'
import personService from './services/persons'




const Persons = (props)=> {
  
  return(
    props.persons.filter(function (person) { return person.name.toLowerCase().includes(props.filter.toLowerCase())}).map(person => 
      <p key={person.name}>{person.name} {person.number} <button onClick ={(event)=>props.removePerson(event,person)}>delete</button></p> 
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

  const removePerson = (event,person) => {
  // event.preventDefault()
    if(window.confirm("Delete "+person.name+" ?")){
      const copy = [...persons]
      personService
        .remove(person.id)
        .then(response => 
          {
           copy.splice(copy.indexOf(person), 1);
           setPersons(copy)
        })
    }
  }

 useEffect(() => {
  personService
    .getAll()
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
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(response => {
        personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const person = persons.find(person => person.name === newName)
        person.number = newNumber
        personService
        .update(person.id,person)
        .then(response=> {
          personService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
        })
      }
      
    } 
    setNewName("")
    setNewNumber("")
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
      <Persons persons ={persons} filter ={filter} removePerson={removePerson} />
    </div>
  )

}

export default App