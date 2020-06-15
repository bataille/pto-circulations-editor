import React from 'react';
import { connect } from 'react-redux'
import { clickOnCirculationRow } from '../app/actions'

import PrGare from '../components/PrGare'
import CirculationRowActions from '../containers/CirculationRowActions'

class CirculationRow extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        return (
            <tr className={ this.props.selected ? "table-secondary" : "" }
             onClick={() => {this.props.dispatch(clickOnCirculationRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td>{this.props.numMarche}</td>
                <td>{this.props.codeTCT}</td>
                <td>{heureDepart.toLocaleDateString('fr-FR')}</td>
                <td>{heureDepart.toLocaleTimeString('fr-FR')}</td>
                <td><CirculationRowActions id={this.props.id} /></td>
            </tr>
        );
    }
}

export default connect()(CirculationRow);