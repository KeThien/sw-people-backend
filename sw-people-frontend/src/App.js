import React from 'react'
import './App.css'
import Container from 'muicss/lib/react/container'
import PeopleList from './components/PeopleList'

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Star Wars Characters</h1>
        <PeopleList />
      </Container>
    </div>
  )
}

export default App
