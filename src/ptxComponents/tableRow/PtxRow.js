import React from 'react';
import { connect } from 'react-redux'
import { clickOnRow } from '../../app/actions'

import RowActions from '../../mainComponents/table/RowActions'

class PtxRow extends React.Component {
    render() {
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td><RowActions
                    id={this.props.id} className="float-right" /></td>
            </tr>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let ptx = state.ptxsById[ownProps.id];
    return {
        selected: ptx.selected,
    }
}


export default connect(mapStateToProps)(PtxRow);