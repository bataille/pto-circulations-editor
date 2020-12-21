import React from 'react';
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table';

import EnchainementRow from './tableRow/EnchainementRow'

const EnchainementsTable = ({ enchainementsIdList }) => (
    <Table hover>
        <thead>
            <tr>
                <th className="w-20">Id</th>
                <th className="w-20">Id Entrant</th>
                <th className="w-20">Id Sortant</th>
                <th className="w-10"></th>
            </tr>
        </thead>
        <tbody>
            {enchainementsIdList.map(enchainementId => (
                <EnchainementRow key={enchainementId}
                id={enchainementId} />
            ))}
        </tbody>
    </Table >
)

const mapStateToProps = state => {
    return {
        enchainementsIdList: Object.keys(state.enchainementsById)
    }
}

export default connect(mapStateToProps)(EnchainementsTable);