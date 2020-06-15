import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import CirculationsLoadButton from '../containers/CirculationsLoadButton'
import CirculationsSaveButton from '../containers/CirculationsSaveButton'
import CirculationsDeleteButton from '../containers/CirculationsDeleteButton'
import CirculationsDuplicateButton from '../containers/CirculationsDuplicateButton'

const CirculationsListToolbar = () => (
    <Navbar bg="dark" sticky="top">
        <CirculationsLoadButton className="mr-2" />
        <ButtonGroup>
            <CirculationsDuplicateButton />
            <CirculationsDeleteButton />
        </ButtonGroup>
        <CirculationsSaveButton fileName="circulations.xml" className="ml-auto" />
    </Navbar>
)

export default CirculationsListToolbar;
