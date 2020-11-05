import React from 'react'

const Persons = (props) => {
  return(
    props.persons.filter(function (person) { return person.name.toLowerCase().includes(props.filter.toLowerCase())}).map(person =>
      <p key={person.name}>{person.name} {person.number} <button onClick ={(event) => props.removePerson(event,person)}>delete</button></p>
    )
  )
}
export default Persons