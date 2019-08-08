import React, { Component } from 'react'

export class PersonInfo extends Component {
  componentDidMount() {
    console.log('test')
    // console.log(this.props)
  }
  render() {
    return (
      <div>
        <h2>{this.props.person.name}</h2>
      </div>
    )
  }
}

export default PersonInfo
