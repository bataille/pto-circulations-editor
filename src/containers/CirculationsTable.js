import React from 'react';
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table';
import CirculationRow from './circulationTableRow/CirculationRow';

const CirculationsTable = ({ circulationsIdList }) => (
    <Table hover>
        <thead>
            <tr>
                <th className="w-30">Id</th>
                <th className="w-20">Num. Marche</th>
                <th className="w-15">Code TCT</th>
                <th className="w-25">Date et heure de départ</th>
                <th className="w-10"></th>
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

export default connect(mapStateToProps)(CirculationsTable);