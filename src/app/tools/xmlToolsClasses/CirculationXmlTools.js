import { GenericXmlTools } from './GenericXmlTools'

export class CirculationXmlTools extends GenericXmlTools {

  elementsTagName = "circulations";
  elementTagName = "Circulation";

  xmlTextToElementsObject = (xmlText, defaultObject) => {
    let result = {};
    let xmlDoc = this.xmlParser.parseFromString(xmlText, "application/xml");
    let circulations = xmlDoc.getElementsByTagName("Circulation");

    Array.from(circulations).forEach((circulation) => {
      var currentId = 0;
      if (circulation.hasChildNodes) {
        circulation.childNodes.forEach((node) => {
          switch (node.tagName) {
            case "id":
              currentId = node.innerHTML;
              result[currentId] = {
                ...defaultObject,
                id: node.innerHTML,
              };
              break;
            case "dateCreation":
              result[currentId].dateCreation = node.innerHTML;
              break;
            case "demandeur":
              result[currentId].demandeur = node.innerHTML;
              break;
            case "localisation":
              result[currentId].localisation = node.innerHTML;
              break;
            case "Parcours":
              result[currentId].parcours = this.xmlSerializer.serializeToString(node);
              break;
            case "Mission":
              result[currentId].mission = this.xmlSerializer.serializeToString(node);
              break;
            case "ProfilHoraire":
              result[currentId].profilHoraire = this.xmlSerializer.serializeToString(node);
              break;
            case "ProfilDeCirculation":
              result[currentId].profilDeCirculation = this.xmlSerializer.serializeToString(node);
              break;
            case "evenementsCirculation":
              result[currentId].evenementsCirculation = this.xmlSerializer.serializeToString(node);
              break;
            case "EtatCirculation":
              result[currentId].etatCirculation = this.xmlSerializer.serializeToString(node);
              break;
            case "TypeConvoi":
              result[currentId].typeConvoi = this.xmlSerializer.serializeToString(node);
              break;
            case "TypeGestion":
              result[currentId].typeGestion = this.xmlSerializer.serializeToString(node);
              break;
            case "renvoisStandards":
              result[currentId].renvoisStandards = this.xmlSerializer.serializeToString(node);
              break;
            case "ParcoursTopologique":
              result[currentId].parcoursTopologique = this.xmlSerializer.serializeToString(node);
              break;
            default:
              return;
          }
        })
      }
    })

    return result;
  }

  getElementAsXmlText = (element) => {
    var circulationsText = "<Circulation>\n";

    circulationsText += "<id>" + element.id + "</id>\n";
    circulationsText += "<dateCreation>" + element.dateCreation + "</dateCreation>\n";
    circulationsText += "<demandeur>" + element.demandeur + "</demandeur>\n"
    circulationsText += "<localisation>" + element.localisation + "</localisation>\n";
    circulationsText += element.parcours + "\n";
    circulationsText += element.mission + "\n";
    circulationsText += element.profilHoraire + "\n";
    circulationsText += element.profilDeCirculation + "\n";
    circulationsText += element.evenementsCirculation + "\n";
    circulationsText += element.etatCirculation + "\n";
    circulationsText += element.typeConvoi + "\n";
    circulationsText += element.typeGestion + "\n";
    circulationsText += element.renvoisStandards + "\n";
    circulationsText += element.parcoursTopologique + "\n";

    circulationsText += "</Circulation>\n";

    return circulationsText;
  }

  getNumMarche = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("numMarcheOrigine")[0].innerHTML;
  }

  withNumMarche = (circulation, numMarche) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    xmlDom.getElementsByTagName("numMarcheOrigine")[0].innerHTML = numMarche;
    return ({
      ...circulation,
      etatCirculation: this.xmlSerializer.serializeToString(xmlDom)
    })
  }

  getCodeTCT = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    return xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML;
  }

  withCodeTCT = (circulation, tctId, tctCode) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("id")[0].innerHTML = tctId;
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("code")[0].innerHTML = tctCode;
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML = tctCode;
    return ({
      ...circulation,
      typeGestion: this.xmlSerializer.serializeToString(xmlDom)
    })
  }
  getHeureDepart = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML;
  }

  withHeureDepart = (circulation, heureDepart) => {
    let heureToWrite = new Date(heureDepart);
    let xmlDom = this.xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML = heureToWrite.toISOString().slice(0, -5) + "Z";
    return ({
      ...circulation,
      etatCirculation: this.xmlSerializer.serializeToString(xmlDom)
    })
  }

  getDureeTrajet = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.profilHoraire, "application/xml");
    let detailHoraire = xmlDom.getElementsByTagName("detailsHoraire")[0]
      .getElementsByTagName("DetailHoraire");
    return detailHoraire[detailHoraire.length - 1].getElementsByTagName("tempsDepuisOrigine")[0].innerHTML;
  }

  getDepart = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.mission, "application/xml");
    return xmlDom.getElementsByTagName("etapesMission")[0]
      .getElementsByTagName("EtapeMission")[0]
      .getElementsByTagName("pr")[0].getAttribute("id");
  }

  getArrivee = (circulation) => {
    let xmlDom = this.xmlParser.parseFromString(circulation.mission, "application/xml");
    const Etapes = xmlDom.getElementsByTagName("etapesMission")[0]
      .getElementsByTagName("EtapeMission");
    return Etapes[Etapes.length - 1].getElementsByTagName("pr")[0].getAttribute("id");
  }

  withId = (element, id) => {
    return ({
        ...element,
        id: id,
    })
  }

  getHeure = this.getHeureDepart;
  withHeure = this.withHeureDepart;

}