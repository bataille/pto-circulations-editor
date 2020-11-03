import React from 'react'
import { connect } from 'react-redux'
import { editedObject } from '../../app/enum'

import Container from 'react-bootstrap/Container'

import LoadButton from '../toolbar/LoadButton'
import CirculationsTable from '../../circulationsComponents/CirculationsTable'
import PtxsTable from '../../ptxComponents/PtxsTable'

class MainTable extends React.Component {

    render() {
        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                return (<CirculationsTable />);
            case editedObject.PTX:
                return (<PtxsTable />);
            case editedObject.NONE:
            default:
                return (
                    <Container style={{ marginTop: 50 }}>
                        <h2>Éditeur de fichiers xml pour l'import dans GOC 2.0</h2>
                        <p>
                            <b>Aucun fichier chargé</b><br />
                            Pour commencer charger un fichier xml à éditer
                        </p>
                        <LoadButton buttonText=" Charger un fichier" />
                    </Container>
                );
        }
    }

}

const mapState = (state) => {
    return { editedObject: state.editedObject }
}

export default connect(mapState)(MainTable)