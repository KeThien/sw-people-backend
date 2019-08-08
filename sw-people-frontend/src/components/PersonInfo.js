import React, { Component } from 'react'

export class PersonInfo extends Component {
  componentDidMount() {
    console.log('test')
    // console.log(this.props)
  }
  render() {
    if (this.props.person.name) {
      return (
        <div className="mui--text-left">
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
        </div>
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
  paddingLeft: '10px'
}
const nameStyle = {
  margin: '5px 10px'
}
export default PersonInfo
