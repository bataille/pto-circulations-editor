import React from 'react';
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table';
import CirculationRow from './CirculationRow';

const CirculationsList = ({ circulationsIdList }) => (
    <Table hover>
        <thead>
            <tr>
                <th className="col-sm-2">Id</th>
                <th className="col-sm-1">Num. Marche</th>
                <th className="col-sm-1">Code TCT</th>
                <th className="col-sm-2">Date et heure de départ</th>
                <th className="col-sm-1"></th>
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