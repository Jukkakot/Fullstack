import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
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
  //
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'New example part',
        exercises: 9,
        id: 4
      }
    ]
  }

    return (
    <div>
      <Course course={course} />
    </div>
  )
    
}

ReactDOM.render(<App />, document.getElementById('root'))