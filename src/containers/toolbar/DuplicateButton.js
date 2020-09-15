import React from 'react'
import { connect } from 'react-redux'
import { duplicateSelected } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Files } from 'react-bootstrap-icons';

class DuplicateButton extends React.Component {

  render() {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id="duplicate-button-tooltip" {...props}>
            Dupliquer
          </Tooltip>)}
      >
        <Button variant="light" className={this.props.className}
          onClick={() => { this.props.dispatch(duplicateSelected()) }}>
          <Files />
        </Button >
      </OverlayTrigger>
    );
  }

}

export default connect()(DuplicateButton)