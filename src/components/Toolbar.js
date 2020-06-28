import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { ListNested } from 'react-bootstrap-icons';

import SelectionButtonsGroup from '../containers/toolbar/SelectionButtonsGroup'
import LoadButton from '../containers/toolbar/LoadButton'
import SaveButton from '../containers/toolbar/SaveButton'
import DeleteButton from '../containers/toolbar/DeleteButton'
import DuplicateButton from '../containers/toolbar/DuplicateButton'
import FanHeureDepartButton from '../containers/toolbar/FanHeureDepartButton'
import FanNumMarcheButton from '../containers/toolbar/FanNumMarcheButton'
import ShiftDateButton from '../containers/toolbar/ShiftDateButton'

const Toolbar = () => (
    <Navbar bg="dark" sticky="top">
        <LoadButton className="mr-2" />
        <SelectionButtonsGroup className="mr-2" />
        <ButtonGroup className="mr-2">
            <DuplicateButton />
            <DeleteButton />
        </ButtonGroup>

        <ShiftDateButton className="mr-2" />

        <DropdownButton variant="light" title={<ListNested />}>
            <FanNumMarcheButton />
            <FanHeureDepartButton />
        </DropdownButton>

        <SaveButton fileName="circulations.xml" className="ml-auto" />
    </Navbar>
)

export default Toolbar;
