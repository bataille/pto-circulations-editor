import React from 'react'
import { connect } from 'react-redux'
import { changeNumMarche, stopNumMarcheCellEdition } from '../../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class NumMarcheCellEditor extends React.Component {
    constructor(props) {
        super(props);
        this.numMarcheEdit = props.numMarche;

        // This binding is necessary to make `this` work in the callback    
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate() {
        if (this.props.numMarche !== this.numMarcheEdit) {
            this.props.dispatch(
                changeNumMarche(this.props.id, this.numMarcheEdit));
        } else {
            this.props.dispatch(
                stopNumMarcheCellEdition(this.props.id));
        }
    }

    render() {
        return (
            <InputGroup className={this.props.className}>
                <FormControl
                    defaultValue={this.props.numMarche}
                    aria-label="Numéro de marche"
                    onChange={(event) => { this.numMarcheEdit = event.target.value }}
                    onClick={(event) => { event.stopPropagation() }}
                    onKeyDown={(event) => { 
                        if (event.key === "Escape") {
                        this.props.dispatch(stopNumMarcheCellEdition(this.props.id));
                    }}}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            this.handleValidate();
                    }}}
                />
                <InputGroup.Append>
                    <Button variant="success"
                        onClick={(event) => {
                            this.handleValidate();
                            event.stopPropagation();
                        }}>
                        <Check />
                    </Button >
                </InputGroup.Append>
            </InputGroup>
        );
    }

}

export default connect()(NumMarcheCellEditor)
