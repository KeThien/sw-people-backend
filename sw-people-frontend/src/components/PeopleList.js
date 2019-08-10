import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import SnackBar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'

import PersonInfo from './PersonInfo'

export class PeopleList extends Component {
  state = {
    people: [],
    speciesList: [],
    person: {},
    mode: '',
    snackOpen: false,
    snackMessage: '',
    snackColor: ''
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
  handleSubmit = personAndFlag => {
    this.setState({ mode: 'view' })
    console.log('submit', this.state.person.id)
    this.setState({ person: { ...personAndFlag[0] } })
    console.log(this.state.person)
    this.setState(prevState => ({
      people: prevState.people.map(prevPerson => {
        if (prevPerson.id === this.state.person.id) {
          return personAndFlag[0]
        } else {
          return prevPerson
        }
      })
    }))
    const isSuccess = personAndFlag[1] ? true : false
    // this.setState({ snackOpen: true })
    this.callSnackBar(true, isSuccess)
  }
  callSnackBar(isOpen, isSuccess) {
    this.setState({ snackOpen: isOpen ? true : false })
    this.setState({ snackColor: isSuccess ? '#4BB543' : '#A52100' })
    this.setState({
      snackMessage: isSuccess ? 'Update successful!' : 'Error: Try again'
    })
  }
  handleClose = e => {
    this.setState({ snackOpen: false })
  }
  render() {
    return (
      <Container>
        <Grid container spacing={3} wrap="wrap-reverse">
          <Grid item xs={12} sm={5}>
            <Paper style={listPaperStyle}>
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
        <SnackBar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.snackOpen}
          autoHideDuration={2500}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{ backgroundColor: this.state.snackColor }}
            message={this.state.snackMessage}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </SnackBar>
      </Container>
    )
  }
}

const paperStyle = {
  maxHeight: '100vh',
  padding: '32px 0'
}
const listPaperStyle = {
  maxHeight: '185px',
  overflowY: 'scroll',
  boxSizing: 'border-box',
  textAlign: 'center'
}
export default PeopleList
