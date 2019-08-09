import React, { Component } from 'react'
import './People.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'

import PersonInfo from './PersonInfo'

export class PeopleList extends Component {
  state = {
    people: [],
    speciesList: [],
    person: {},
    mode: ''
  }
  getPeople() {
    axios
      .get('/api/v1/people')
      .then(res => {
        this.setState({ people: res.data })
      })
      .catch(error => console.log(error))
  }
  componentDidMount() {
    this.getPeople()
    axios
      .get('/api/v1/species')
      .then(res => {
        this.setState({
          speciesList: res.data.map(species => {
            return { id: species.id, value: species.name }
          })
        })
      })
      .catch(error => console.log(error))
  }
  handleClick = id => {
    const person = this.state.people.filter(person => {
      return person.id === id
    })[0]
    this.setState({ person: { ...person } })
    this.setState({ mode: 'view' })
  }
  handleMode = e => {
    // console.log(e, 'mode')
    this.setState({ mode: e })
  }
  handleSubmit = person => {
    this.setState({ mode: 'view' })
    // console.log('submit', this.state.person.id)
    this.setState({ person: { ...person } })
    console.log(this.state.person)
    this.setState(prevState => ({
      people: prevState.people.map(prevPerson => {
        if (prevPerson.id === this.state.person.id) {
          return person
        } else {
          return prevPerson
        }
      })
    }))
  }
  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Paper>
              {this.state.people.map(person => {
                return (
                  <div key={person.id}>
                    <Button
                      color="primary"
                      onClick={() => this.handleClick(person.id)}
                    >
                      {person.name}
                    </Button>
                    <Divider />
                  </div>
                )
              })}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper style={paperStyle}>
              <PersonInfo
                person={this.state.person}
                handleMode={this.handleMode}
                mode={this.state.mode}
                handleSubmit={this.handleSubmit}
                speciesList={this.state.speciesList}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const paperStyle = {
  maxHeight: '100vh',
  padding: '32px 0'
}

export default PeopleList
