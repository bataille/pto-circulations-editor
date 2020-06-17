import React from 'react';
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table';
import CirculationRow from './CirculationRow';

const CirculationsList = ({ circulationsIdList }) => (
    <Table hover>
        <thead>
            <tr>
                <th>Id</th>
                <th>Num. Marche</th>
                <th>Code TCT</th>
                <th>Jour de départ</th>
                <th>Heure de départ</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {circulationsIdList.map(circulationId => (
                <CirculationRow  key={circulationId}
                id={circulationId} />
            ))}
        </tbody>
    </Table >
)

const mapStateToProps = state => {
    return {
        circulationsIdList: Object.keys(state.circulationsById)
    }
}

export default connect(mapStateToProps)(CirculationsList);