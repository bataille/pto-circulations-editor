import React from 'react';
import { connect } from 'react-redux'
import { clickOnCirculationRow, numMarcheCellClicked, heureDepartCellClicked } from '../app/actions'
import { getCodeTCT, getHeureDepart, getNumMarche } from '../app/tools/CirculationXmlTools'

import CirculationRowActions from '../containers/CirculationRowActions'
import CirculationNumMarcheCellEditor from './CirculationNumMarcheCellEditor'
import CirculationHeureDepartCellEditor from './CirculationHeureDepartCellEditor'

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
                <td>{
                    this.props.heureDepartEdited
                        ? <CirculationHeureDepartCellEditor
                            id={this.props.id}
                            heureDepart={this.props.heureDepart} />
                        : <span onClick={(event) => {
                            this.props.dispatch(heureDepartCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            {heureDepart.toLocaleDateString('fr-FR')} - {heureDepart.toLocaleTimeString('fr-FR')}
                        </span>
                }</td>
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
        numMarcheEdited: circulation.numMarcheEdited,
        heureDepartEdited: circulation.heureDepartEdited
    }
}


export default connect(mapStateToProps)(CirculationRow);