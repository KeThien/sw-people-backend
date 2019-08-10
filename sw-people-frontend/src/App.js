import React from 'react'
import './App.css'
import PeopleList from './components/PeopleList'

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Star Wars Characters</h1>
      <PeopleList />
    </div>
  )
}

export default App
