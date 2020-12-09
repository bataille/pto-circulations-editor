import React from 'react'
import { connect } from 'react-redux'
import { changeIdSelected } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Code } from 'react-bootstrap-icons';

class ChangeIdButton extends React.Component {

  render() {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id="changeid-button-tooltip" {...props}>
            Affecter un nouveau GUID
          </Tooltip>)}
      >
        <Button variant="light" className={this.props.className}
          disabled={this.props.disabled}
          onClick={() => { this.props.dispatch(changeIdSelected()) }}>
          <Code />
        </Button >
      </OverlayTrigger>
    );
  }

}

export default connect()(ChangeIdButton)