/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import './App.css'

const Notification = ( { message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message } ) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState("")
  const [newNumber,setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const removePerson = (event,person) => {
    event.preventDefault()
    if(window.confirm("Delete "+person.name+" ?")){
      const copy = [...persons]
      personService
        .remove(person.id)
        .then(() =>
        {
          copy.splice(copy.indexOf(person), 1)
          setPersons(copy)

          setNotificationMessage(person.name+ " was removed")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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

  const onSubmit = event => {
    event.preventDefault()
    if(!persons.some(person => person.name === newName)){
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          const copy = [...persons]
          copy.push(response.data)
          setPersons(copy)
          setNotificationMessage(newName+ " was added")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)

        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const personCopy = { ...persons.find(person => person.name === newName) }
        personCopy.number = newNumber
        personService
          .update(personCopy.id,personCopy)
          .then(response => {
            const copy = [...persons]
            copy[copy.findIndex(person => person.id===response.data.id)] = response.data
            setPersons(copy)
            setNotificationMessage(personCopy.name+ "'s number was changed")
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(() => {
            setErrorMessage("Error when updating "+personCopy.name+" number")
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
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
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
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