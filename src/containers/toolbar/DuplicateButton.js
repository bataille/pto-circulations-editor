import React from 'react'
import { connect } from 'react-redux'
import { duplicateSelected } from '../../app/actions'

import Button from 'react-bootstrap/Button'
import { Files } from 'react-bootstrap-icons';

class DuplicateButton extends React.Component {

  render() {
    return (
      <Button variant="light" className={this.props.className}
        onClick={() => { this.props.dispatch(duplicateSelected()) }}>
        <Files />
      </Button >
    );
  }

}

export default connect()(DuplicateButton)