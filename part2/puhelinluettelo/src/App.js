import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={ event =>{
            event.preventDefault()
            if(!persons.some(person => person.name === newName)){
              const copy = [...persons]
              copy.push({name: newName})
              setPersons(copy)
              setNewName("")
            } else {
              alert (`${newName} is already added to phonebook`)
              setNewName("")
            }
            
          }
          }>
        <div>
          name: <input value = {newName} onChange ={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person => 
          <p key={person.name}>{person.name}</p> 
        )} 
    </div>
  )

}

export default App