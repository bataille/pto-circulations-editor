import React from 'react'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import DropdownButton from 'react-bootstrap/DropdownButton'
import { ListNested } from 'react-bootstrap-icons';

import FanHeureDepartButton from './FanHeureDepartButton'
import FanNumMarcheButton from './FanNumMarcheButton'

class FanActionsDropdown extends React.Component {

  render() {
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id="fan-dropdown-tooltip" {...props}>
            Répartir pour la sélection
          </Tooltip>)}
      >
        <DropdownButton variant="light" title={<ListNested />}>
            <FanNumMarcheButton />
            <FanHeureDepartButton />
        </DropdownButton>
      </OverlayTrigger>
    );
  }

}

export default FanActionsDropdown