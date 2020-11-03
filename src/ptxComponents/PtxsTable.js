import React from 'react';
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table';

import PtxRow from './tableRow/PtxRow'

const PtxsTable = ({ ptxsIdList }) => (
    <Table hover>
        <thead>
            <tr>
                <th className="w-30">Id</th>
                <th className="w-10"></th>
            </tr>
        </thead>
        <tbody>
            {ptxsIdList.map(ptxId => (
                <PtxRow key={ptxId}
                id={ptxId} />
            ))}
        </tbody>
    </Table >
)

const mapStateToProps = state => {
    return {
        ptxsIdList: Object.keys(state.ptxsById)
    }
}

export default connect(mapStateToProps)(PtxsTable);