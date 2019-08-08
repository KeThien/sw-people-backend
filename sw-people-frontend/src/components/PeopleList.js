import React, { Component } from 'react'
import './People.css'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import Divider from 'muicss/lib/react/divider'
import axios from 'axios'
import update from 'immutability-helper'
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
    console.log(this.state.person)
  }

  render() {
    const person = JSON.stringify(this.state.people[0])
    return (
      <Container>
        <Row>
          <Col xs="12" md="5">
            <Panel style={panelStyle}>
              {this.state.people.map(person => {
                return (
                  <div key={person.id}>
                    <Button
                      variant="flat"
                      color="primary"
                      onClick={() => this.handleClick(person.id)}
                    >
                      {person.name}
                    </Button>
                    <Divider />
                  </div>
                )
              })}
            </Panel>
          </Col>
          <Col xs="12" md="7">
            <div>
              <Panel id="info-panel" className="mui--hidden-xs mui--hidden-sm">
                <PersonInfo person={this.state.person} />
              </Panel>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const panelStyle = {
  maxHeight: '100vh'
}

export default PeopleList
