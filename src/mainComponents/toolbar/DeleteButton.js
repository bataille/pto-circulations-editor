import React from 'react'
import { connect } from 'react-redux'
import { deleteSelected } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Trash } from 'react-bootstrap-icons';

class DeleteButton extends React.Component {

  render() {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id="button-tooltip" {...props}>
            Supprimer
          </Tooltip>)}
      >
        <Button variant="light" className={this.props.className}
          disabled={this.props.disabled}
          onClick={() => { this.props.dispatch(deleteSelected()) }}>
          <Trash />
        </Button >
      </OverlayTrigger>
    );
  }

}

export default connect()(DeleteButton)