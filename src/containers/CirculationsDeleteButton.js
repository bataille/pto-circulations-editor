import React from 'react'
import { connect } from 'react-redux'
import { deleteSelected } from '../app/actions'

import Button from 'react-bootstrap/Button'
import { Trash } from 'react-bootstrap-icons';

class CirculationsDeleteButton extends React.Component {

  render() {
    return (
      <Button variant="light" className={this.props.className}
        onClick={() => { this.props.dispatch(deleteSelected()) }}>
        <Trash />
      </Button >
    );
  }

}

export default connect()(CirculationsDeleteButton)