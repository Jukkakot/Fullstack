import React from 'react'


const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => 
          <p key={part.id}>{part.name} {part.exercises}</p>
        )}
      </div>
       
    )
}

const Total = (props) => {
  let sum = props.course.parts.reduce(function (total, currentValue) {
    return total + currentValue.exercises;
  },0);

    return (
        <div>
        <p><b>Total of {sum} exercises</b></p>
        </div>
    )
}
const Course = (props) => {
  return (
    <div>
            <Header course ={props.course}/>
            <Content course ={props.course}/>
            <Total course ={props.course}/>
        </div>
  )
}
export default Course