import React from 'react'
import { connect } from 'react-redux'
import { changeNumMarche, stopNumMarcheCellEdition } from '../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class CirculationNumMarcheCellEditor extends React.Component {
    constructor(props) {
        super(props);
        this.numMarcheEdit = props.numMarche;
    }

    render() {
        return (
            <InputGroup className={this.props.className}>
                <FormControl
                    defaultValue={this.props.numMarche}
                    aria-label="Numéro de marche"
                    onChange={(event) => { this.numMarcheEdit = event.target.value }}
                />
                <InputGroup.Append>
                    <Button variant="success"
                        onClick={(event) => {
                            if (this.props.numMarche !== this.numMarcheEdit) {
                                this.props.dispatch(
                                    changeNumMarche(this.props.id, this.numMarcheEdit));
                            } else {
                                this.props.dispatch(
                                    stopNumMarcheCellEdition(this.props.id));
                            }
                            event.stopPropagation();
                        }}>
                        <Check />
                    </Button >
                </InputGroup.Append>
            </InputGroup>
        );
    }

}

export default connect()(CirculationNumMarcheCellEditor)
