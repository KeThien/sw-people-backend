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
    person: {}
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
    // const infoPanel = document.getElementById('info-panel')
    // infoPanel.classList.toggle('is-info-open')
    // infoPanel.classList.toggle('mui--hidden-xs')
    // infoPanel.classList.toggle('mui--hidden-sm')
    const person = this.state.people.filter(person => {
      return person.id === id
    })[0]
    this.setState({ person: { ...person } })
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
              <Paper>
                <PersonInfo person={this.state.person} />
              </Paper>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

// const paperStyle = {
//   maxHeight: '100vh'
// }

export default PeopleList
