import React, { Component } from 'react'
import './People.css'

import axios from 'axios'
import update from 'immutability-helper'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

export class PersonInfo extends Component {
  state = {
    mode: 'view',
    species: [
      { value: 'Human', label: 'Human' },
      { value: 'Droid', label: 'Droid' },
      { value: 'Hutt', label: 'Hutt' }
    ],
    gender: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
      { value: 'hermaphrodite', label: 'hermaphrodite' },
      { value: 'hutt', label: 'hutt' },
      { value: 'none', label: 'none' }
    ],
    person: this.props.person
  }
  handleClickMode = e => {
    if (e === 'edit') {
      this.setState({ mode: 'edit' })
    } else if (e === 'view') {
      this.setState({ mode: 'view' })
    }
  }
  handleChange = e => {}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ mode: 'view' })
    console.log('submit')
  }
  componentDidMount() {}
  render() {
    if (this.props.person.name && this.state.mode === 'view') {
      return (
        <Container>
          <Grid container style={GridContainerStyle}>
            <Grid item xs={7} className="text-align-left">
              <h2 style={nameStyle}>{this.props.person.name}</h2>
              <ul style={styleList}>
                <li>
                  species: <strong>{this.props.person.species}</strong>
                </li>
                <li>
                  gender: <strong>{this.props.person.gender}</strong>
                </li>
                <li>
                  homeworld: <strong>{this.props.person.homeworld}</strong>
                </li>
                <li>
                  height: <strong>{this.props.person.height}</strong>
                </li>
                <li>
                  mass: <strong>{this.props.person.mass}</strong>
                </li>
                <li>
                  birth year: <strong>{this.props.person.birth_year}</strong>
                </li>
                <li>
                  skin color: <strong>{this.props.person.skin_color}</strong>
                </li>
                <li>
                  hair color: <strong>{this.props.person.hair_color}</strong>
                </li>
                <li>
                  eye color: <strong>{this.props.person.eye_color}</strong>
                </li>
              </ul>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => this.handleClickMode('edit')}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={5}>
              <img
                src={this.props.person.photo_url}
                alt="avatar"
                style={avatarStyle}
              />
            </Grid>
          </Grid>
        </Container>
      )
    } else if (this.props.person.name && this.state.mode === 'edit') {
      return (
        <Container>
          <Grid container style={GridContainerStyle}>
            <Grid item xs={7} className="text-align-left">
              <h2 style={nameStyle}>{this.props.person.name}</h2>
              <div style={formStyle}>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <FormControl margin="normal">
                    <InputLabel>species</InputLabel>
                    <Select value={this.props.person.species} required={true}>
                      {this.state.species.map((option, i) => {
                        return (
                          <MenuItem key={i} value={option.value}>
                            {option.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  <FormControl margin="normal">
                    <InputLabel>gender</InputLabel>
                    <Select value={this.props.person.gender} required={true}>
                      {this.state.gender.map((option, i) => {
                        return (
                          <MenuItem key={i} value={option.value}>
                            {option.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="homeworld"
                      defaultValue={this.props.person.homeworld}
                      required={true}
                      margin="normal"
                      onChange={this.handleChange('homeworld')}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="height"
                      defaultValue={this.props.person.height}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="mass"
                      defaultValue={this.props.person.mass}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="birth year"
                      defaultValue={this.props.person.birth_year}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="skin color"
                      defaultValue={this.props.person.skin_color}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="hair color"
                      defaultValue={this.props.person.hair_color}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="eye color"
                      defaultValue={this.props.person.eye_color}
                      required={true}
                      margin="normal"
                    />
                  </FormControl>
                </form>
              </div>
              <Button
                style={buttonStyle}
                variant="outlined"
                size="small"
                onClick={() => this.handleClickMode('view')}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={5}>
              <img
                src={this.props.person.photo_url}
                alt="avatar"
                style={avatarStyle}
              />
            </Grid>
          </Grid>
        </Container>
      )
    } else {
      return (
        <Container>
          <Grid container>
            <Grid item>
              <h2 style={nameStyle}>Select a character</h2>
            </Grid>
          </Grid>
        </Container>
      )
    }
  }
}
const styleList = {
  listStyle: 'none',
  paddingLeft: '0px',
  lineHeight: '23px'
}
const nameStyle = {
  margin: '10px 0px'
}
const avatarStyle = {
  width: '100%'
}
const GridContainerStyle = {
  padding: '32px 0'
}
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '32px',
  margin: '10px 0'
}
const buttonStyle = {
  marginRight: '10px'
}

export default PersonInfo
