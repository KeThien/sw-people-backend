import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import axios from 'axios'
import update from 'immutability-helper'

export class PeopleList extends Component {
  state = {
    people: []
  }

  render() {
    return (
      <Panel>
        <Button>Button</Button>
      </Panel>
    )
  }
}

export default PeopleList
