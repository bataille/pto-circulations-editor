import React from 'react'
import { connect } from 'react-redux'
import { fanNumMarcheButtonClicked, fanNumMarcheClosed, fanNumMarcheValidated } from '../../app/actions'

import DropdownItem from 'react-bootstrap/DropdownItem'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

class FanNumMarcheButton extends React.Component {
    constructor(props) {
        super(props);

        this.numMarcheEdited = 0;
        this.increment = 1;

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
            <DropdownItem onClick={this.handleShow}>
                Numéro de marche
                <Modal show={this.props.shown} onHide={this.handleClose} 
                onClick={(event) => { event.stopPropagation(); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ventilatation des numéros de marche</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Numéro de marche intial</Form.Label>
                            <FormControl
                                defaultValue={this.dateEdited}
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
                                defaultValue="1"
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
            </DropdownItem>
        );
    }

}

const mapState = (state) => {
    return ({
        shown: state.toolbar.fanNumMarcheModal.shown
    });
}

export default connect(mapState)(FanNumMarcheButton)