import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
  return (
      <h1>{props.text}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const StatisticsLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}
const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
  <table>
    <tbody>
    <StatisticsLine text ={"good"} value = {props.good}/>
    <StatisticsLine text ={"neutral"} value = {props.neutral}/>
    <StatisticsLine text ={"bad"} value = {props.bad}/>
    <StatisticsLine text ={"all"} value = {props.bad + props.good + props.neutral}/>
    <StatisticsLine text ={"average"} value = {(props.good - props.bad)/(props.bad + props.good + props.neutral)}/>
    <StatisticsLine text ={"positive"} value = {props.good/((props.bad + props.good + props.neutral)) *100 +" %"}/>
    </tbody>
      </table>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = (props) => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points,setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const headerText1 = "give feedback"
  const headerText2 = "statistics"
 
  return (
    <div>
      <Header text = {headerText1}/>
      <Button onClick={() => setGood(good + 1)} text = {"good"}/>
      <Button onClick={() => setNeutral(neutral + 1)} text = {"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} text = {"bad"}/>
      <Header text = {headerText2}/>
      <Statistics  good ={good} neutral = {neutral} bad = {bad}/>


      <h1>------------Anecdotes-------------</h1>
      <Button onClick={() => setSelected(Math.floor(Math.random() * 6))} text = {"Next anecdote"}/>
      <Button onClick={() =>{
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        
      } } text = {"Vote"}/>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[points.indexOf(Math.max.apply(0, points))]}</p>
      <p>Has {points[points.indexOf(Math.max.apply(0, points))]} votes</p>
    </div>
    
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)