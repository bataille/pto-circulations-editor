import React from 'react'
import { connect } from 'react-redux'
import { selectAll, unselectAll, flipSelectionAll } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { ListCheck, ListTask, CircleHalf } from 'react-bootstrap-icons';

class SelectionButtonsGroup extends React.Component {

  render() {
    return (
      <ButtonGroup className={this.props.className}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="select-all-tooltip" {...props}>
              Tout sélectionner
            </Tooltip>)}
        >
          <Button variant="light"
            onClick={() => { this.props.dispatch(selectAll()) }}>
            <ListCheck />
          </Button >
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="unselect-all-tooltip" {...props}>
              Tout déselectionner
            </Tooltip>)}
        >
          <Button variant="light"
            onClick={() => { this.props.dispatch(unselectAll()) }}>
            <ListTask />
          </Button >
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="flip-selection-tooltip" {...props}>
              Inverser la sélection
            </Tooltip>)}
        >
          <Button variant="light"
            onClick={() => { this.props.dispatch(flipSelectionAll()) }}>
            <CircleHalf />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    );
  }

}

export default connect()(SelectionButtonsGroup)