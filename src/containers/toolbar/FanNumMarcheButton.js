import React from 'react'
import { connect } from 'react-redux'
import { fanNumMarcheButtonClicked } from '../../app/actions'

import DropdownItem from 'react-bootstrap/DropdownItem'

class FanNumMarcheButton extends React.Component {
    constructor(props) {
        super(props);

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(fanNumMarcheButtonClicked());
        event.stopPropagation();
    }

    render() {
        return (
            <DropdownItem onClick={this.handleShow}>
                Numéro de marche
            </DropdownItem>
        );
    }

}

export default connect()(FanNumMarcheButton)