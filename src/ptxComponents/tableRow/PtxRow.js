import React from 'react';
import { connect } from 'react-redux'
import { clickOnRow, dateHeureDebutCellClicked } from '../../app/actions'

import RowActions from '../../mainComponents/table/RowActions'
import DateHeureDebutCellEditor from './DateHeureDebutCellEditor'
import { ptxXmlTools } from '../../app/tools/xmlTools'

class PtxRow extends React.Component {
    render() {
        let dateHeureDebut = new Date(this.props.dateHeureDebut);
        return (
            <tr className={this.props.selected ? "table-secondary" : ""}
                onClick={() => { this.props.dispatch(clickOnRow(this.props.id)) }} >
                <td>{this.props.id}</td>
                <td>{this.props.ressourceInfraType}</td>
                <td>{this.props.ressourceDescription}</td>
                <td>{
                    this.props.dateHeureDebutEdited
                        ? <DateHeureDebutCellEditor
                            id={this.props.id}
                            dateHeureDebut={this.props.dateHeureDebut} />
                        : <span onClick={(event) => {
                            this.props.dispatch(dateHeureDebutCellClicked(this.props.id));
                            event.stopPropagation();
                        }}>
                            {dateHeureDebut.toLocaleDateString('fr-FR')} - {dateHeureDebut.toLocaleTimeString('fr-FR')}
                        </span>
                }</td>
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
        ressourceInfraType: ptxXmlTools.getPtxRessourcesInfraType(ptx),
        ressourceDescription: ptxXmlTools.getPtxRessourcesDescription(ptx),
        dateHeureDebut: ptxXmlTools.getDateHeureDebut(ptx),
        dateHeureDebutEdited: ptx.dateHeureDebutEdited,
    }
}


export default connect(mapStateToProps)(PtxRow);