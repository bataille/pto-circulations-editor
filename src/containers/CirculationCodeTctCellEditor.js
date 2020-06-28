import React from 'react'
import { connect } from 'react-redux'
import { getCodesTctArray, getCodeTctId } from '../app/tools/CodeTctTools'
import { changeCodeTct, stopCodeTctCellEdition } from '../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class CirculationCodeTctCellEditor extends React.Component {
    constructor(props) {
        super(props);
        this.codeTctEdit = props.codeTCT;

        // This binding is necessary to make `this` work in the callback    
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate() {
        if (this.props.codeTCT !== this.codeTctEdit) {
            this.props.dispatch(
                changeCodeTct(
                    this.props.id, 
                    getCodeTctId(this.codeTctEdit), 
                    this.codeTctEdit));
        } else {
            this.props.dispatch(
                stopCodeTctCellEdition(this.props.id));
        }
    }

    render() {
        return (
            <InputGroup className={this.props.className}>
                <FormControl as="select"
                    defaultValue={this.props.codeTCT}
                    aria-label="Code TCT"
                    onChange={(event) => { this.codeTctEdit = event.target.value }}
                    onClick={(event) => { event.stopPropagation() }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            this.props.dispatch(stopCodeTctCellEdition(this.props.id));
                        }
                    }}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            this.handleValidate();
                        }
                }}>
                    {getCodesTctArray().map(codeTct => (
                        <option>{codeTct}</option>
                    ))}
                </FormControl>
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

export default connect()(CirculationCodeTctCellEditor)
