import React from 'react';

import PrGare from './PrGare'

class Circulation extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        return (
            <tr>
                <td>{this.props.numMarche}</td>
                <td>{this.props.codeTCT}</td>
                <td>{heureDepart.toLocaleDateString('fr-FR')}</td>
                <td>{heureDepart.toLocaleTimeString('fr-FR')}</td>
                <td><PrGare guid={this.props.depart} /></td>
                <td><PrGare guid={this.props.arrivee} /></td>
            </tr>
        );
    }
}

export default Circulation;