import React from 'react'
import { connect } from 'react-redux'
import { shiftDateButtonClicked } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { BoxArrowRight } from 'react-bootstrap-icons'

class ShiftDateButton extends React.Component {
    constructor(props) {
        super(props);

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(shiftDateButtonClicked());
        event.stopPropagation();
    }

    render() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={(props) => (
                    <Tooltip id="shift-date-tooltip" {...props}>
                        Déplacer la date et l'heure
                    </Tooltip>)}>
                <Button variant="light" className={this.props.className} 
                    disabled={this.props.disabled} onClick={this.handleShow}>
                    <BoxArrowRight />
                </Button>
            </OverlayTrigger >
        );
    }

}

export default connect()(ShiftDateButton)