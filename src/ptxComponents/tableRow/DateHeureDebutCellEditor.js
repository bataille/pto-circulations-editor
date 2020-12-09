import React from 'react'
import { connect } from 'react-redux'
import { changeDateHeureDebut, stopDateHeureDebutCellEdition } from '../../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class DateHeureDebutCellEditor extends React.Component {
    constructor(props) {
        super(props);
        let parsedDate = new Date(props.dateHeureDebut);
        this.dateEdited = parsedDate.toISOString().slice(0, 10);
        this.timeEdited = parsedDate.toLocaleTimeString('fr-FR');

        // This binding is necessary to make `this` work in the callback    
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate() {
        let newHeureDebut = new Date(
            this.dateEdited + " " + this.timeEdited);
        if (newHeureDebut !== this.props.dateHeureDebut) {
            this.props.dispatch(changeDateHeureDebut(
                this.props.id, newHeureDebut.toISOString()))

        } else {
            this.props.dispatch(stopDateHeureDebutCellEdition(this.props.id));
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <InputGroup>
                    <FormControl
                        defaultValue={this.dateEdited}
                        aria-label="Date du début"
                        type="date"
                        onChange={(event) => {
                            this.dateEdited = event.target.value
                        }}
                        onClick={(event) => { event.stopPropagation() }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                this.props.dispatch(stopDateHeureDebutCellEdition(this.props.id));
                            }
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.handleValidate();
                            }
                        }}
                    />
                    <FormControl
                        defaultValue={this.timeEdited}
                        aria-label="Heure du début"
                        type="time"
                        onChange={(event) => { this.timeEdited = event.target.value }}
                        onClick={(event) => { event.stopPropagation() }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                this.props.dispatch(stopDateHeureDebutCellEdition(this.props.id));
                            }
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.handleValidate();
                            }
                        }}
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
            </div>
        );
    }

}

export default connect()(DateHeureDebutCellEditor)
