import React from 'react';
import { connect } from 'react-redux'
import { clickOnRow } from '../../app/actions'

import RowActions from '../../mainComponents/table/RowActions'

class EnchainementRow extends React.Component {
    render() {
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td>{this.props.elementEntrantId}</td>
                <td>{this.props.elementSortantId}</td>
                <td><RowActions
                    id={this.props.id} className="float-right" /></td>
            </tr>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let enchainement = state.enchainementsById[ownProps.id];
    return {
        selected: enchainement.selected,
        elementEntrantId: enchainement.elementEntrantId,
        elementSortantId: enchainement.elementSortantId
    }
}


export default connect(mapStateToProps)(EnchainementRow);