import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import CirculationsLoader from '../containers/CirculationsLoader'

const CirculationsListToolbar = () => (
    <Navbar>
        <CirculationsLoader />
    </Navbar>
)


export default CirculationsListToolbar;
