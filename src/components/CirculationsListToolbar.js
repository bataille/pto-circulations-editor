import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import CirculationsLoader from '../containers/CirculationsLoader'
import CirculationsSaver from '../containers/CirculationsSaver'

const CirculationsListToolbar = () => (
    <Navbar bg="dark" sticky="top">
        <CirculationsLoader />
        <CirculationsSaver fineName="circulations.xml" />
    </Navbar>
)

export default CirculationsListToolbar;
