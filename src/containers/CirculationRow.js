import React from 'react';
import { connect } from 'react-redux'
import { clickOnCirculationRow, numMarcheCellClicked } from '../app/actions'
import { getCodeTCT, getHeureDepart, getNumMarche } from '../app/tools/CirculationXmlTools'

import CirculationRowActions from '../containers/CirculationRowActions'
import CirculationNumMarcheCellEditor from './CirculationNumMarcheCellEditor'

class CirculationRow extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnCirculationRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td>{
                    this.props.numMarcheEdited
                        ? <CirculationNumMarcheCellEditor
                            id={this.props.id}
                            numMarche={this.props.numMarche} />
                        : <span onClick={(event) => {
                            this.props.dispatch(numMarcheCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            { this.props.numMarche }
                        </span>
                }</td>
                <td>{this.props.codeTCT}</td>
                <td>{heureDepart.toLocaleDateString('fr-FR')}</td>
                <td>{heureDepart.toLocaleTimeString('fr-FR')}</td>
                <td><CirculationRowActions 
                id={this.props.id} className="float-right" /></td>
            </tr>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let circulation = state.circulationsById[ownProps.id];
    return {
        numMarche: getNumMarche(circulation),
        codeTCT: getCodeTCT(circulation),
        heureDepart: getHeureDepart(circulation),
        selected: circulation.selected,
        numMarcheEdited: circulation.numMarcheEdited
    }
}


export default connect(mapStateToProps)(CirculationRow);