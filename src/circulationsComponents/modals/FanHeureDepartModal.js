import React from 'react'
import { connect } from 'react-redux'
import { fanHeureDepartButtonClicked, fanHeureDepartClosed, fanHeureDepartValidated } from '../../app/actions'
import { getHeureDepart } from '../../app/tools/CirculationXmlTools'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

class FanHeureDepartModal extends React.Component {
    constructor(props) {
        super(props);

        this.dateEdited = this.props.startDate.toISOString().slice(0, 10);
        this.timeEdited = this.props.startDate.toLocaleTimeString('fr-FR');

        this.increment = 600; // default: 10 minutes increment

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(fanHeureDepartButtonClicked());
        event.stopPropagation();
    }

    handleClose(event) {
        this.props.dispatch(fanHeureDepartClosed());
        if (event) {
            event.stopPropagation();
        }
    }

    handleValidate(event) {
        let newHeureDepart = new Date(
            this.dateEdited + " " + this.timeEdited);
        this.props.dispatch(
            fanHeureDepartValidated(newHeureDepart.toISOString(), this.increment));
        event.stopPropagation();
    }

    render() {
        return (
            <Modal show={this.props.shown} onHide={this.handleClose}
                onClick={(event) => { event.stopPropagation(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Ventilatation des heures de départ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Heure de départ</Form.Label>

                        <InputGroup>
                            <FormControl
                                defaultValue={this.dateEdited}
                                aria-label="Date de départ"
                                type="date"
                                onChange={(event) => {
                                    this.dateEdited = event.target.value;
                                }}
                            />
                            <FormControl
                                defaultValue={this.timeEdited}
                                aria-label="Heure de départ"
                                type="time"
                                onChange={(event) => {
                                    this.timeEdited = event.target.value;
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Incrément</Form.Label>
                        <Form.Control
                            defaultValue={"00:10:00"}
                            type="time" step="1" placeholder="Incrément"
                            onChange={(event) => {
                                var secondsInc =
                                    parseInt(event.target.value.slice(0, 2) * 3600, 10);
                                secondsInc += parseInt(event.target.value.slice(3, 5) * 60, 10);
                                var secondsPart = parseInt(event.target.value.slice(6, 8), 10);
                                secondsInc += isNaN(secondsPart) ? 0 : secondsPart;
                                this.increment = secondsInc;
                            }} />
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
        );
    }

}

const mapState = (state) => {
    let selectedId = Object.keys(state.circulationsById).find(
        (id) => { return state.circulationsById[id].selected });
    return ({
        shown: state.main.fanHeureDepartModal.shown,
        startDate:
            (selectedId === undefined)
                ? new Date(Date.now())
                : new Date(getHeureDepart(state.circulationsById[selectedId]))
    });
}

export default connect(mapState)(FanHeureDepartModal)