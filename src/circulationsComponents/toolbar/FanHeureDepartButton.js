import React from 'react'
import { connect } from 'react-redux'
import { fanHeureDepartButtonClicked } from '../../app/actions'

import DropdownItem from 'react-bootstrap/DropdownItem'

class FanHeureDepartButton extends React.Component {
    constructor(props) {
        super(props);

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(fanHeureDepartButtonClicked());
        event.stopPropagation();
    }

    render() {
        return (
            <DropdownItem variant="light" onClick={this.handleShow}>
                Heure départ
            </DropdownItem>
        );
    }

}

export default connect()(FanHeureDepartButton)