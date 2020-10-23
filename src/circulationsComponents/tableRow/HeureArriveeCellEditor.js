import React from 'react'
import { connect } from 'react-redux'
import { changeHeureDepart, stopHeureArriveeCellEdition } from '../../app/actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

class HeureArriveeCellEditor extends React.Component {
    constructor(props) {
        super(props);
        let parsedHeureDepart = new Date(props.heureDepart);
        let parsedDate = new Date(parsedHeureDepart.getTime() + 1000 * props.dureeTrajet); 
        this.dateEdited = parsedDate.toISOString().slice(0, 10);
        this.timeEdited = parsedDate.toLocaleTimeString('fr-FR');

        // This binding is necessary to make `this` work in the callback    
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate() {
        let newHeureArrivee = new Date(this.dateEdited + " " + this.timeEdited);
        let newHeureDepart = new Date(newHeureArrivee.getTime() - 1000 * this.props.dureeTrajet);
        if (newHeureDepart !== this.props.heureDepart) {
            this.props.dispatch(changeHeureDepart(
                this.props.id, newHeureDepart.toISOString()))

        } else {
            this.props.dispatch(stopHeureArriveeCellEdition(this.props.id));
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <InputGroup>
                    <FormControl
                        defaultValue={this.dateEdited}
                        aria-label="Date de départ"
                        type="date"
                        onChange={(event) => {
                            this.dateEdited = event.target.value
                        }}
                        onClick={(event) => { event.stopPropagation() }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                this.props.dispatch(stopHeureArriveeCellEdition(this.props.id));
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
                        aria-label="Heure de départ"
                        type="time"
                        onChange={(event) => { this.timeEdited = event.target.value }}
                        onClick={(event) => { event.stopPropagation() }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                this.props.dispatch(stopHeureArriveeCellEdition(this.props.id));
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

export default connect()(HeureArriveeCellEditor)
