import React from 'react'
import { connect } from 'react-redux'
import { fanNumMarcheButtonClicked, fanNumMarcheClosed, fanNumMarcheValidated } from '../../app/actions'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { getNumMarche } from '../../app/tools/CirculationXmlTools'

class FanNumMarcheModal extends React.Component {
    constructor(props) {
        super(props);

        this.numMarcheEdited = this.props.selectedNumMarche;
        this.increment = 2;

        // These bindings are necessary to make `this` work in the callback    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleShow(event) {
        this.props.dispatch(fanNumMarcheButtonClicked());
        event.stopPropagation();
    }

    handleClose(event) {
        this.props.dispatch(fanNumMarcheClosed());
        if (event) {
            event.stopPropagation();
        }
    }

    handleValidate(event) {
        this.props.dispatch(
            fanNumMarcheValidated(this.numMarcheEdited, this.increment));
        event.stopPropagation();
    }

    render() {
        return (
            <Modal show={this.props.shown} onHide={this.handleClose}
                onClick={(event) => { event.stopPropagation(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Ventilatation des numéros de marche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Numéro de marche intial</Form.Label>
                        <FormControl
                            defaultValue={this.numMarcheEdited}
                            aria-label="Numéro de marche"
                            type="number"
                            onChange={(event) => {
                                this.numMarcheEdited = parseInt(event.target.value, 10);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Incrément</Form.Label>
                        <Form.Control
                            defaultValue={this.increment}
                            type="number" placeholder="Incrément"
                            onChange={(event) => {
                                this.increment = parseInt(event.target.value, 10);
                            }
                            } />
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
        shown: state.toolbar.fanNumMarcheModal.shown,
        selectedNumMarche:
            (selectedId === undefined)
                ? 0
                : parseInt(getNumMarche(state.circulationsById[selectedId]))
    });
}

export default connect(mapState)(FanNumMarcheModal)