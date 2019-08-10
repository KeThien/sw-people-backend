import React, { Component } from 'react'
// import './People.css'

import axios from 'axios'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'

export class PersonInfo extends Component {
  state = {
    genderList: [
      { value: 'male' },
      { value: 'female' },
      { value: 'hermaphrodite' },
      { value: 'none' },
      { value: 'n/a' }
    ],
    person: {
      name: '',
      species: '',
      gender: '',
      homeworld: '',
      height: '',
      mass: '',
      birth_year: '',
      skin_color: '',
      hair_color: '',
      eye_color: ''
    },
    errors: {
      species: '',
      gender: '',
      homeworld: '',
      height: '',
      mass: '',
      birth_year: '',
      skin_color: '',
      hair_color: '',
      eye_color: ''
    },
    isFormValid: '',
    flagApiSuccess: false,
    isLoading: false
  }
  componentDidMount() {
    this.setState({ isFormValid: this.checkObjEmpty(this.state.errors) })
  }
  handleChange = e => {
    // console.log(e.target.name, e.target.value)
    e.preventDefault()
    const { name, value } = e.target
    this.setState(prevState => ({
      person: {
        ...prevState.person,
        [name]: value
      }
    }))
    // VALIDATIONS on Form change
    let errors = this.state.errors
    switch (name) {
      case 'homeworld':
        errors.homeworld = value.length < 4 ? 'Must be 4 characters long!' : ''
        break
      case 'height':
        errors.height = value.length <= 0 ? 'is required!' : ''
        break
      case 'mass':
        errors.mass = value.length <= 0 ? 'is required!' : ''
        break
      case 'birth_year':
        errors.birth_year = value.length < 4 ? 'Must be 4 characters long!' : ''
        break
      case 'skin_color':
        errors.skin_color = value.length < 4 ? 'Must be 4 characters long!' : ''
        break
      case 'hair_color':
        errors.hair_color = value.length < 4 ? 'Must be 3 characters long!' : ''
        break
      case 'eye_color':
        errors.eye_color = value.length < 4 ? 'Must be 4 characters long!' : ''
        break
      default:
        break
    }
    this.setState({ errors, [name]: value }, () => {
      // console.log(errors)
    })
    this.setState({ isFormValid: this.checkObjEmpty(this.state.errors) })
  }
  checkObjEmpty(obj) {
    return Object.values(obj).every(x => x === null || x === '')
  }
  handleClickMode = e => {
    if (e === 'edit') {
      this.props.handleMode('edit')
      this.setState({ flagApiSuccess: false })
      this.setState({
        person: {
          name: this.props.person.name,
          species_id: this.props.person.species_id,
          gender: this.props.person.gender,
          homeworld: this.props.person.homeworld,
          height: this.props.person.height,
          mass: this.props.person.mass,
          birth_year: this.props.person.birth_year,
          skin_color: this.props.person.skin_color,
          hair_color: this.props.person.hair_color,
          eye_color: this.props.person.eye_color
        }
      })
    } else if (e === 'view') {
      this.props.handleMode('view')
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const id = this.props.person.id
    this.setState({ mode: 'view' })
    this.setState({ isLoading: true })
    axios
      .patch(`/api/v1/people/${id}`, this.state.person)
      .then(response => {
        console.log(response)
        this.setState({ flagApiSuccess: true })
        this.props.handleSubmit([
          { ...this.props.person, ...this.state.person },
          this.state.flagApiSuccess
        ])
        this.setState({ isLoading: false })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    if (this.props.person.name && this.props.mode === 'view') {
      const speciesName = this.props.speciesList.filter(
        species => species.id === this.props.person.species_id
      )[0].value
      return (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={7} className="text-align-left">
              <h2 style={nameStyle}>{this.props.person.name}</h2>
              <ul style={styleList}>
                <li>
                  species: <strong>{speciesName}</strong>
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
    } else if (this.props.person.name && this.props.mode === 'edit') {
      return (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <h2 style={nameStyle}>{this.props.person.name}</h2>
              <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <FormControl fullWidth margin="dense">
                    <InputLabel>species</InputLabel>
                    <Select
                      name="species_id"
                      value={this.state.person.species_id}
                      required={true}
                      onChange={e => this.handleChange(e)}
                    >
                      {this.props.speciesList.map((option, i) => {
                        return (
                          <MenuItem key={i} value={option.id}>
                            {option.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>gender</InputLabel>
                    <Select
                      name="gender"
                      value={this.state.person.gender}
                      required={true}
                      onChange={e => this.handleChange(e)}
                    >
                      {this.state.genderList.map((option, i) => {
                        return (
                          <MenuItem key={i} value={option.value}>
                            {option.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.homeworld !== ''}
                  >
                    <InputLabel>homeworld</InputLabel>
                    <Input
                      name="homeworld"
                      required={true}
                      value={this.state.person.homeworld}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>
                      {this.state.errors.homeworld}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.height !== ''}
                  >
                    <InputLabel>height</InputLabel>
                    <Input
                      name="height"
                      required={true}
                      value={this.state.person.height}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>{this.state.errors.height}</FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.mass !== ''}
                  >
                    <InputLabel>mass</InputLabel>
                    <Input
                      name="mass"
                      required={true}
                      value={this.state.person.mass}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>{this.state.errors.mass}</FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.birth_year !== ''}
                  >
                    <InputLabel>birth year</InputLabel>
                    <Input
                      name="birth_year"
                      required={true}
                      value={this.state.person.birth_year}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>
                      {this.state.errors.birth_year}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.skin_color !== ''}
                  >
                    <InputLabel>skin color</InputLabel>
                    <Input
                      name="skin_color"
                      required={true}
                      value={this.state.person.skin_color}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>
                      {this.state.errors.skin_color}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.hair_color !== ''}
                  >
                    <InputLabel>hair color</InputLabel>
                    <Input
                      name="hair_color"
                      required={true}
                      value={this.state.person.hair_color}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>
                      {this.state.errors.hair_color}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={this.state.errors.eye_color !== ''}
                  >
                    <InputLabel>eye color</InputLabel>
                    <Input
                      name="eye_color"
                      required={true}
                      value={this.state.person.eye_color}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormHelperText>
                      {this.state.errors.eye_color}
                    </FormHelperText>
                  </FormControl>
                </form>
              </div>
              <div style={buttonGroupStyle}>
                <Button
                  style={buttonStyle}
                  variant="outlined"
                  size="small"
                  onClick={() => this.handleClickMode('view')}
                >
                  Cancel
                </Button>
                <Button
                  style={buttonStyle}
                  variant="contained"
                  size="small"
                  color="secondary"
                  type="submit"
                  disabled={!this.state.isFormValid}
                  onClick={e => this.handleSubmit(e)}
                >
                  Submit
                </Button>
                <Fade in={this.state.isLoading}>
                  <CircularProgress size={24} color="secondary" />
                </Fade>
              </div>
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
        <Grid container>
          <Grid item xs={12}>
            <h2 style={{ textAlign: 'center' }}>Welcome to my test project</h2>
            <p style={{ textAlign: 'center' }}>Please select a character</p>
          </Grid>
        </Grid>
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
  maxWidth: '100%',
  borderRadius: '5px',
  maxHeight: '300px'
}
const buttonStyle = {
  marginRight: '10px'
}
const buttonGroupStyle = {
  display: 'flex',
  alignItems: 'center'
}

export default PersonInfo
