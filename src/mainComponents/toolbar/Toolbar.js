import React from 'react';
import { connect } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { editedObject } from '../../app/enum'

import SelectionButtonsGroup from './SelectionButtonsGroup'
import LoadButton from './LoadButton'
import SaveButton from './SaveButton'
import DeleteButton from './DeleteButton'
import DuplicateButton from './DuplicateButton'
import ShiftDateButton from './ShiftDateButton'
import ObjectSpecificToolbar from './ObjectSpecificToolbar'
import CurrentlyEditedLabel from './CurrentlyEditedLabel'

const Toolbar = (props) => (
    <Navbar bg="dark" sticky="top">
        <LoadButton className="mr-2" />
        <SelectionButtonsGroup className="mr-2" disabled={props.editedObject === editedObject.NONE} />
        <ButtonGroup className="mr-2">
            <DuplicateButton disabled={props.editedObject === editedObject.NONE} />
            <DeleteButton disabled={props.editedObject === editedObject.NONE} />
        </ButtonGroup>

        <ShiftDateButton className="mr-2" disabled={props.editedObject === editedObject.NONE } />
        <ObjectSpecificToolbar />

        <Navbar.Collapse className="justify-content-end">
            <CurrentlyEditedLabel className="mr-sm-3" />
            <SaveButton fileName="circulations.xml" />
        </Navbar.Collapse>
    </Navbar>
)

const mapState = (state) => {
    return { editedObject: state.editedObject }
}

export default connect(mapState)(Toolbar)
