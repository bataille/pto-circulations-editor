import React from 'react';
import { connect } from 'react-redux'
import { clickOnCirculationRow } from '../app/actions'

import PrGare from '../components/PrGare'

class CirculationRow extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        return (
            <tr className={ this.props.selected ? "table-secondary" : "" }
             onClick={() => {this.props.dispatch(clickOnCirculationRow(this.props.id)) }} >
                <td></td>
                <td>{this.props.numMarche}</td>
                <td>{this.props.codeTCT}</td>
                <td>{heureDepart.toLocaleDateString('fr-FR')}</td>
                <td>{heureDepart.toLocaleTimeString('fr-FR')}</td>
                <td><PrGare guid={this.props.depart} /></td>
                <td><PrGare guid={this.props.arrivee} /></td>
                <td></td>
            </tr>
        );
    }
}

export default connect()(CirculationRow);