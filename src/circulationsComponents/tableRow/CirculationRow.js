import React from 'react';
import { connect } from 'react-redux'
import { clickOnRow, numMarcheCellClicked, heureDepartCellClicked, codeTctCellClicked, heureArriveeCellClicked } from '../../app/actions'
import { circulationXmlTools } from '../../app/tools/xmlTools'

import RowActions from '../../mainComponents/table/RowActions'
import NumMarcheCellEditor from './NumMarcheCellEditor'
import HeureDepartCellEditor from './HeureDepartCellEditor'
import HeureArriveeCellEditor from './HeureArriveeCellEditor'
import CodeTctCellEditor from './CodeTctCellEditor'

class CirculationRow extends React.Component {
    render() {
        let heureDepart = new Date(this.props.heureDepart);
        let heureArrivee = new Date(heureDepart.getTime() + 1000 * this.props.dureeTrajet);
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnRow(this.props.id)) }} >
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
                            {this.props.numMarche}
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
                            {this.props.codeTCT}
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
                <td>{
                    this.props.heureArriveeEdited
                        ? <HeureArriveeCellEditor
                            id={this.props.id}
                            heureDepart={this.props.heureDepart}
                            dureeTrajet={this.props.dureeTrajet} />
                        : <span onClick={(event) => {
                            this.props.dispatch(heureArriveeCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            {heureArrivee.toLocaleDateString('fr-FR')} - {heureArrivee.toLocaleTimeString('fr-FR')}
                        </span>
                }</td>
                <td><RowActions
                    id={this.props.id} className="float-right" /></td>
            </tr>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let circulation = state.circulationsById[ownProps.id];
    return {
        numMarche: circulationXmlTools.getNumMarche(circulation),
        codeTCT: circulationXmlTools.getCodeTCT(circulation),
        heureDepart: circulationXmlTools.getHeureDepart(circulation),
        dureeTrajet: circulationXmlTools.getDureeTrajet(circulation),
        selected: circulation.selected,
        numMarcheEdited: circulation.numMarcheEdited,
        heureDepartEdited: circulation.heureDepartEdited,
        heureArriveeEdited: circulation.heureArriveeEdited,
        codeTctEdited: circulation.codeTctEdited
    }
}


export default connect(mapStateToProps)(CirculationRow);