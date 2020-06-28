import React from 'react'
import { connect } from 'react-redux'
import { shiftDateButtonClicked, shiftDateClosed, shiftDateValidated } from '../../app/actions'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { BoxArrowRight } from 'react-bootstrap-icons'

class ShiftDateButton extends React.Component {
    constructor(props) {
        super(props);

        let parsedDate = new Date(Date.now());
        this.startDay = parsedDate.toISOString().slice(0, 10);
        this.startTime = "00:00:00";
        this.goalDay = parsedDate.toISOString().slice(0, 10);
        this.goalTime = "00:00:00";

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(shiftDateButtonClicked());
        event.stopPropagation();
    }

    handleClose(event) {
        this.props.dispatch(shiftDateClosed());
        if (event) {
            event.stopPropagation();
        }
    }

    handleValidate(event) {
        let start = new Date(this.startDay + " " + this.startTime);
        let goal = new Date(this.goalDay + " " + this.goalTime);
        this.props.dispatch(
            shiftDateValidated(start.toISOString(), goal.toISOString())
        );
        event.stopPropagation();
    }

    render() {
        return (
            <>
                <Button variant="light" className={this.props.className} onClick={this.handleShow}>
                    <BoxArrowRight />
                </Button>
                <Modal show={this.props.shown} onHide={this.handleClose}
                    onClick={(event) => { event.stopPropagation(); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Décalage des heures de départ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>De la date</Form.Label>
                            <InputGroup>
                                <FormControl
                                    defaultValue={this.startDay}
                                    aria-label="De la date (jour)"
                                    type="date"
                                    onChange={(event) => {
                                        this.startDay = event.target.value;
                                    }}
                                />
                                <FormControl
                                    defaultValue={this.startTime}
                                    aria-label="De la date (heure)"
                                    type="time"
                                    onChange={(event) => {
                                        this.startTime = event.target.value;
                                    }}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Vers la date</Form.Label>
                            <InputGroup>
                                <FormControl
                                    defaultValue={this.goalDay}
                                    aria-label="Vers la date (jour)"
                                    type="date"
                                    onChange={(event) => {
                                        this.goalDay = event.target.value;
                                    }}
                                />
                                <FormControl
                                    defaultValue={this.goalTime}
                                    aria-label="Vers la date (heure)"
                                    type="time"
                                    onChange={(event) => {
                                        this.goalTime = event.target.value;
                                    }}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                            Annuler
                    </Button>
                        <Button variant="success" onClick={this.handleValidate}>
                            Valider
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

const mapState = (state) => {
    return ({
        shown: state.toolbar.shiftDateModal.shown
    });
}

export default connect(mapState)(ShiftDateButton)