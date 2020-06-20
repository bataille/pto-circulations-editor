import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import CirculationsSelectionButtonsGroup from '../containers/CirculationsSelectionButtonsGroup'
import CirculationsLoadButton from '../containers/CirculationsLoadButton'
import CirculationsSaveButton from '../containers/CirculationsSaveButton'
import CirculationsDeleteButton from '../containers/CirculationsDeleteButton'
import CirculationsDuplicateButton from '../containers/CirculationsDuplicateButton'
import CirculationsFanHeureDepartButton from '../containers/CirculationsFanHeureDepartButton'

const CirculationsListToolbar = () => (
    <Navbar bg="dark" sticky="top">
        <CirculationsLoadButton className="mr-2" />
        <CirculationsSelectionButtonsGroup className="mr-2"/>
        <ButtonGroup className="mr-2">
            <CirculationsDuplicateButton />
            <CirculationsDeleteButton />
        </ButtonGroup>
        <CirculationsFanHeureDepartButton />
        
        <CirculationsSaveButton fileName="circulations.xml" className="ml-auto" />
    </Navbar>
)

export default CirculationsListToolbar;
