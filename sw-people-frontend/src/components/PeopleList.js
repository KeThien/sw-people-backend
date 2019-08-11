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
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import StarIcon from '@material-ui/icons/Star'

import axios from 'axios'

import PersonInfo from './PersonInfo'

export class PeopleList extends Component {
  state = {
    people: [],
    speciesList: [],
    filterPeopleList: [],
    person: {},
    mode: '',
    snackOpen: false,
    snackMessage: '',
    snackColor: '',
    selectSpecies_id: 0,
    isLoading: false,
    localFavorite: [],
    isFavorite: false
  }
  getPeople() {
    this.setState({ isLoading: true })
    axios
      .get('/api/v1/people')
      .then(res => {
        this.setState({ people: res.data })
        this.setState({ filterPeopleList: this.state.people })
      })
      .catch(error => console.log(error))
    const parseFav = JSON.parse(localStorage.getItem('localFavorite'))
    this.setState({ localFavorite: parseFav })
  }
  componentDidMount() {
    this.getPeople()
    axios
      .get('/api/v1/species')
      .then(res => {
        this.setState({
          speciesList: res.data.map(species => {
            return { id: species.id, value: species.name }
          }),
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }
  handleClick = id => {
    const person = this.state.people.filter(person => {
      return person.id === id
    })[0]
    this.setState({
      person: { ...person },
      mode: 'view',
      isFavorite: this.checkFav(id)
    })
  }
  handleMode = e => {
    // console.log(e, 'mode')
    this.setState({ mode: e })
  }
  handleSubmit = personAndFlag => {
    this.setState({ mode: 'view', person: { ...personAndFlag[0] } })
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
    let message = {
      success: 'Update successful!',
      error: 'Error: Try again'
    }
    if (isSuccess) {
      this.callSnackBar(true, message.success, '#4BB543')
    } else {
      this.callSnackBar(true, message.error, '#A52100')
    }
  }
  handleFavorite = (e, personId) => {
    const localFavorite = this.state.localFavorite || []
    this.setState(
      {
        isFavorite: e === 'favorite',
        localFavorite:
          e === 'favorite'
            ? [...localFavorite, personId]
            : localFavorite.filter(id => id !== personId)
      },
      () => {
        localStorage.setItem(
          'localFavorite',
          JSON.stringify(this.state.localFavorite)
        )
      }
    )
  }
  checkFav(id) {
    return this.state.localFavorite && this.state.localFavorite.length
      ? this.state.localFavorite.includes(id)
      : false
  }
  callSnackBar(isOpen, message, color) {
    this.setState({
      snackOpen: isOpen ? true : false,
      snackColor: color,
      snackMessage: message
    })
  }
  handleClose = e => {
    this.setState({ snackOpen: false })
  }
  handleSelect = e => {
    e.preventDefault()
    const { value } = e.target
    let filterPeopleList = []
    if (value === -1) {
      filterPeopleList = this.state.people.filter(p => this.checkFav(p.id))
    } else if (value === 0) {
      filterPeopleList = this.state.people
    } else {
      filterPeopleList = this.state.people.filter(p => p.species_id === value)
    }
    this.setState({
      selectSpecies_id: value,
      filterPeopleList
    })
  }
  render() {
    return (
      <Container>
        <Grid container spacing={1} wrap="wrap-reverse">
          <Grid item xs={12} sm={5}>
            <Grid container spacing={1} justify="center">
              <Grid item xs={12}>
                <FormControl fullWidth style={filterStyle}>
                  <InputLabel style={{ textAlign: 'center' }}>
                    filter by
                  </InputLabel>
                  <Select
                    name="species_id"
                    value={this.state.selectSpecies_id}
                    required={true}
                    onChange={e => this.handleSelect(e)}
                  >
                    <MenuItem value={-1}>
                      <em>Your favorites</em>
                      <StarIcon style={{ color: 'gold', fontSize: '18px' }} />
                    </MenuItem>
                    <MenuItem value={0}>
                      <em>All</em>
                    </MenuItem>
                    {this.state.speciesList.map((option, i) => {
                      return (
                        <MenuItem key={i} value={option.id}>
                          {option.value}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Fade in={this.state.isLoading} unmountOnExit>
                  <div style={loadingStyle}>
                    <CircularProgress size={50} color="primary" disableShrink />
                  </div>
                </Fade>
                <Fade in={!this.state.isLoading} timeout={1000}>
                  <Paper style={listPaperStyle}>
                    {this.state.filterPeopleList.map(person => {
                      return (
                        <div
                          key={person.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Button
                            color="primary"
                            onClick={() => this.handleClick(person.id)}
                          >
                            {person.name}
                          </Button>
                          {this.checkFav(person.id) ? (
                            <StarIcon
                              style={{
                                color: 'gold',
                                fontSize: '18px',
                                marginBottom: '3px'
                              }}
                            />
                          ) : (
                            ''
                          )}

                          <Divider />
                        </div>
                      )
                    })}
                  </Paper>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper style={paperStyle}>
              <PersonInfo
                person={this.state.person}
                handleMode={this.handleMode}
                mode={this.state.mode}
                handleSubmit={this.handleSubmit}
                speciesList={this.state.speciesList}
                isFavorite={this.state.isFavorite}
                handleFavorite={this.handleFavorite}
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
  minHeight: '325px',
  padding: '32px 0'
}
const listPaperStyle = {
  maxHeight: '333px',
  overflowY: 'scroll',
  boxSizing: 'border-box',
  textAlign: 'center'
}
const filterStyle = {
  textAlign: 'center',
  padding: '0px',
  boxSizing: 'border-box'
}
const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '185px',
  alignItems: 'center'
}
export default PeopleList
