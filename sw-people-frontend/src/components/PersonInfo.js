import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

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
    ]
  }
  handleClickMode = e => {
    if (e === 'edit') {
      this.setState({ mode: 'edit' })
    } else if (e === 'view') {
      this.setState({ mode: 'view' })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ mode: 'view' })
    console.log('submit')
  }
  render() {
    if (this.props.person.name && this.state.mode === 'view') {
      return (
        <Container>
          <Row>
            <Col xs="7" className="mui--text-left">
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
                color="accent"
                onClick={() => this.handleClickMode('edit')}
              >
                Edit
              </Button>
            </Col>
            <Col xs="5">
              <img
                src={this.props.person.photo_url}
                alt="avatar"
                style={avatarStyle}
              />
            </Col>
          </Row>
        </Container>
      )
    } else if (this.props.person.name && this.state.mode === 'edit') {
      return (
        <Container>
          <Row>
            <Col xs="7" className="mui--text-left">
              <h2 style={nameStyle}>{this.props.person.name}</h2>
              <Form onSubmit={this.handleSubmit}>
                <Select
                  name="species"
                  label="species"
                  defaultValue={this.props.person.species}
                >
                  {this.state.species.map((option, i) => {
                    return (
                      <Option
                        key={i}
                        value={option.value}
                        label={option.label}
                      />
                    )
                  })}
                </Select>
                <Select
                  name="gender"
                  label="gender"
                  defaultValue={this.props.person.gender}
                >
                  {this.state.gender.map((option, i) => {
                    return (
                      <Option
                        key={i}
                        value={option.value}
                        label={option.label}
                      />
                    )
                  })}
                </Select>
                <Input
                  label="homeworld"
                  floatingLabel={true}
                  defaultValue={this.props.person.homeworld}
                  required={true}
                />
                <Input
                  label="height"
                  floatingLabel={true}
                  defaultValue={this.props.person.height}
                  required={true}
                />
                <Input
                  label="mass"
                  floatingLabel={true}
                  defaultValue={this.props.person.mass}
                  required={true}
                />
                <Input
                  label="birth year"
                  floatingLabel={true}
                  defaultValue={this.props.person.birth_year}
                  required={true}
                />
                <Input
                  label="skin color"
                  floatingLabel={true}
                  defaultValue={this.props.person.skin_color}
                  required={true}
                />
                <Input
                  label="hair color"
                  floatingLabel={true}
                  defaultValue={this.props.person.hair_color}
                  required={true}
                />
                <Input
                  label="eye color"
                  floatingLabel={true}
                  defaultValue={this.props.person.eye_color}
                  required={true}
                />
                <Button
                  size="small"
                  variant="flat"
                  onClick={() => this.handleClickMode('view')}
                >
                  Cancel
                </Button>
                <Button size="small" color="accent" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col xs="5">
              <img
                src={this.props.person.photo_url}
                alt="avatar"
                style={avatarStyle}
              />
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <div className="mui--text-left">
          <h2 style={nameStyle}>Select a character</h2>
        </div>
      )
    }
  }
}
const styleList = {
  listStyle: 'none',
  paddingLeft: '0px'
}
const nameStyle = {
  margin: '5px 0px'
}
const avatarStyle = {
  width: '100%'
}
export default PersonInfo
