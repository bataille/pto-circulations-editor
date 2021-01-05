import React from 'react'
import { connect } from 'react-redux'
import { changeNumeroPlanche, stopNumeroPlancheCellEdition } from '../../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class NumeroPlancheCellEditor extends React.Component {
    constructor(props) {
        super(props);
        this.numeroPlancheEdit = props.numeroPlanche;

        // This binding is necessary to make `this` work in the callback    
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate() {
        if (this.props.numeroPlanche !== this.numeroPlancheEdit) {
            this.props.dispatch(
                changeNumeroPlanche(this.props.id, this.numeroPlancheEdit));
        } else {
            this.props.dispatch(
                stopNumeroPlancheCellEdition(this.props.id));
        }
    }

    render() {
        return (
            <InputGroup className={this.props.className}>
                <FormControl
                    defaultValue={this.props.numeroPlanche}
                    aria-label="Numéro de planche"
                    onChange={(event) => { this.numeroPlancheEdit = event.target.value }}
                    onClick={(event) => { event.stopPropagation() }}
                    onKeyDown={(event) => { 
                        if (event.key === "Escape") {
                        this.props.dispatch(stopNumeroPlancheCellEdition(this.props.id));
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

export default connect()(NumeroPlancheCellEditor)
