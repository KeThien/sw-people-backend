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
  }
  handleClick = id => {
    const person = this.state.people.filter(person => {
      return person.id === id
    })[0]
    this.setState({ person: { ...person } })
    this.setState({ mode: 'view' })
  }
  handleMode = e => {
    console.log(e, 'mode')
    this.setState({ mode: e })
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
            <Hidden xsDown>
              <Paper style={paperStyle}>
                <PersonInfo
                  person={this.state.person}
                  handleMode={this.handleMode}
                  mode={this.state.mode}
                />
              </Paper>
            </Hidden>
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
