import { connect } from 'react-redux'
import CirculationsList from '../components/CirculationsList'

const xmlParser = new DOMParser();

const getNumMarche = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("numMarcheOrigine")[0].innerHTML;
}

const getCodeTCT = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    return xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML;
}

const getHeureDepart = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML;
}

const getDepart = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.mission, "application/xml");
    return xmlDom.getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission")[0]
        .getElementsByTagName("pr")[0].getAttribute("id");
}

const getArrivee = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.mission, "application/xml");
    const Etapes = xmlDom.getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission");
    return Etapes[Etapes.length - 1].getElementsByTagName("pr")[0].getAttribute("id");
}

const getCirculationsForDisplay = (circulationsById) => {
    return (Object.keys(circulationsById).map(circulationId => {
        let circulation = circulationsById[circulationId];
        return ({
            id: circulation.id,
            numMarche: getNumMarche(circulation),
            codeTCT: getCodeTCT(circulation),
            heureDepart: getHeureDepart(circulation),
            depart: getDepart(circulation),
            arrivee: getArrivee(circulation),
            selected: circulation.selected
        });
    }));
}

const mapStateToProps = state => {
    return {
        circulations: getCirculationsForDisplay(state.circulationsById)
    }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CirculationsList)