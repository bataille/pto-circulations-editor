import { connect } from 'react-redux'
import CirculationsList from '../components/CirculationsList'

const xmlCirculationsDom = {}

const xmlParser = new DOMParser();

const getXmlCirculationDom = (id, xmlText) => {
    if (xmlCirculationsDom[id] != null) {
        return xmlCirculationsDom[id];
    } else {
        xmlCirculationsDom[id] = xmlParser.parseFromString(xmlText, "application/xml");;
        return xmlCirculationsDom[id];
    }
}

const getNumMarche = (id, xmlText) => {
    const xmlDom = getXmlCirculationDom(id, xmlText)
    return xmlDom.getElementsByTagName("EtatCirculation")[0]
        .getElementsByTagName("numMarcheOrigine")[0].innerHTML;
}

const getCodeTCT = (id, xmlText) => {
    const xmlDom = getXmlCirculationDom(id, xmlText)
    return xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML;
}

const getHeureDepart = (id, xmlText) => {
    const xmlDom = getXmlCirculationDom(id, xmlText)
    return xmlDom.getElementsByTagName("EtatCirculation")[0]
        .getElementsByTagName("dateHeureOrigine")[0].innerHTML;
}

const getDepart = (id, xmlText) => {
    const xmlDom = getXmlCirculationDom(id, xmlText)
    return xmlDom.getElementsByTagName("Mission")[0]
        .getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission")[0]
        .getElementsByTagName("pr")[0].getAttribute("id");
}

const getArrivee = (id, xmlText) => {
    const xmlDom = getXmlCirculationDom(id, xmlText)
    const Etapes = xmlDom.getElementsByTagName("Mission")[0]
        .getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission");
    return Etapes[Etapes.length - 1].getElementsByTagName("pr")[0]
    .getAttribute("id");
}

const getCirculationsForDisplay = (circulations) => {
    return circulations.map(circulation => {
        return ({
            id : circulation.id,
            numMarche: getNumMarche(circulation.id, circulation.xml),
            codeTCT: getCodeTCT(circulation.id, circulation.xml),
            heureDepart: getHeureDepart(circulation.id, circulation.xml),
            depart: getDepart(circulation.id, circulation.xml),
            arrivee: getArrivee(circulation.id, circulation.xml),
        });
    });
}

const mapStateToProps = state => {
    return {
        circulations: getCirculationsForDisplay(state.circulations)
    }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CirculationsList)