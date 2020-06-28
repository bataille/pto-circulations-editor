import React from 'react'
import { connect } from 'react-redux'
import { selectAll, unselectAll, flipSelectionAll } from '../../app/actions'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { ListCheck, ListTask, CircleHalf } from 'react-bootstrap-icons';

class SelectionButtonsGroup extends React.Component {

  render() {
    return (
      <ButtonGroup className={this.props.className}>
        <Button variant="light"
          onClick={() => { this.props.dispatch(selectAll()) }}>
          <ListCheck />
        </Button >
        <Button variant="light"
          onClick={() => { this.props.dispatch(unselectAll()) }}>
          <ListTask />
        </Button >
        <Button variant="light"
          onClick={() => { this.props.dispatch(flipSelectionAll())}}>
          <CircleHalf />
        </Button>
      </ButtonGroup>
    );
  }

}

export default connect()(SelectionButtonsGroup)