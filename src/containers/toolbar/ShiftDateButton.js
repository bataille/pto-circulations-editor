import React from 'react'
import { connect } from 'react-redux'
import { shiftDateButtonClicked } from '../../app/actions'

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
            <Button variant="light" className={this.props.className} onClick={this.handleShow}>
                <BoxArrowRight />
            </Button>
        );
    }

}

export default connect()(ShiftDateButton)