import React from 'react';
import { connect } from 'react-redux'
import { clickOnCirculationRow, numMarcheCellClicked, heureDepartCellClicked, codeTctCellClicked } from '../../app/actions'
import { getCodeTCT, getHeureDepart, getNumMarche } from '../../app/tools/CirculationXmlTools'

import CirculationRowActions from './CirculationRowActions'
import NumMarcheCellEditor from './NumMarcheCellEditor'
import HeureDepartCellEditor from './HeureDepartCellEditor'
import CodeTctCellEditor from './CodeTctCellEditor'

class CirculationRow extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnCirculationRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td>{
                    this.props.numMarcheEdited
                        ? <NumMarcheCellEditor
                            id={this.props.id}
                            numMarche={this.props.numMarche} />
                        : <span onClick={(event) => {
                            this.props.dispatch(numMarcheCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            { this.props.numMarche }
                        </span>
                }</td>
                <td>{
                    this.props.codeTctEdited
                        ? <CodeTctCellEditor
                            id={this.props.id}
                            codeTCT={this.props.codeTCT} />
                        : <span onClick={(event) => {
                            this.props.dispatch(codeTctCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            { this.props.codeTCT }
                        </span>
                }</td>
                <td>{
                    this.props.heureDepartEdited
                        ? <HeureDepartCellEditor
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
        heureDepartEdited: circulation.heureDepartEdited,
        codeTctEdited: circulation.codeTctEdited
    }
}


export default connect(mapStateToProps)(CirculationRow);