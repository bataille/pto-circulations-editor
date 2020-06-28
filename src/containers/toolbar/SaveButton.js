import React from 'react'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import { Upload } from 'react-bootstrap-icons';

class SaveButton extends React.Component {

    getCirculationXmlText = (circulation) => {
        var circulationsText = "<Circulation>\n";

        circulationsText += "<id>" + circulation.id + "</id>\n";
        circulationsText += "<dateCreation>" + circulation.dateCreation + "</dateCreation>\n";
        circulationsText += "<demandeur>" + circulation.demandeur + "</demandeur>\n"
        circulationsText += "<localisation>" + circulation.localisation + "</localisation>\n";
        circulationsText += circulation.parcours + "\n";
        circulationsText += circulation.mission + "\n";
        circulationsText += circulation.profilHoraire + "\n";
        circulationsText += circulation.profilDeCirculation + "\n";
        circulationsText += circulation.evenementsCirculation + "\n";
        circulationsText += circulation.etatCirculation + "\n";
        circulationsText += circulation.typeConvoi + "\n";
        circulationsText += circulation.typeGestion + "\n";
        circulationsText += circulation.renvoisStandards + "\n";
        circulationsText += circulation.parcoursTopologique + "\n";

        circulationsText += "</Circulation>\n";

        return circulationsText;
    }

    concatAllCirculationsAsText = (circulationsById) => {
        var text =  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n";
        text += "<circulations>\n";

        Object.keys(circulationsById).forEach((id) => {
            text += this.getCirculationXmlText(circulationsById[id]);
        });

        text += "</circulations>";
        return text;
    }

    saveAsXmlFile(fileName) {
        let xmlText = this.concatAllCirculationsAsText(this.props.circulations);

        var element = document.createElement('a');
        element.setAttribute('href',
            'data:application/xml;charset=utf-8,' + encodeURIComponent(xmlText));
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    render() {
        return (
            <Button variant="success" className={this.props.className}
                onClick={() => { this.saveAsXmlFile(this.props.fileName) }}>
                <Upload />
            </Button >
        );
    }

}


const mapStateToProps = state => {
    return ({
        circulations: state.circulationsById
    })
}

export default connect(mapStateToProps)(SaveButton)
