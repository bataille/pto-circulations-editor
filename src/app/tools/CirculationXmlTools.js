const xmlParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export const xmlTextToCirculationsObject = (xmlText, defaultCirculationObject) => {
  let result = { };
  let xmlDoc = xmlParser.parseFromString(xmlText, "application/xml");
  let circulations = xmlDoc.getElementsByTagName("Circulation");

  Array.from(circulations).forEach((circulation) => {
    var currentId = 0;
    if (circulation.hasChildNodes) {
      circulation.childNodes.forEach((node) => {
        switch (node.tagName) {
          case "id":
            currentId = node.innerHTML;
            result[currentId] = {
              ...defaultCirculationObject,
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
            result[currentId].parcours = xmlSerializer.serializeToString(node);
            break;
          case "Mission":
            result[currentId].mission = xmlSerializer.serializeToString(node);
            break;
          case "ProfilHoraire":
            result[currentId].profilHoraire = xmlSerializer.serializeToString(node);
            break;
          case "ProfilDeCirculation":
            result[currentId].profilDeCirculation = xmlSerializer.serializeToString(node);
            break;
          case "evenementsCirculation":
            result[currentId].evenementsCirculation = xmlSerializer.serializeToString(node);
            break;
          case "EtatCirculation":
            result[currentId].etatCirculation = xmlSerializer.serializeToString(node);
            break;
          case "TypeConvoi":
            result[currentId].typeConvoi = xmlSerializer.serializeToString(node);
            break;
          case "TypeGestion":
            result[currentId].typeGestion = xmlSerializer.serializeToString(node);
            break;
          case "renvoisStandards":
            result[currentId].renvoisStandards = xmlSerializer.serializeToString(node);
            break;
          case "ParcoursTopologique":
            result[currentId].parcoursTopologique = xmlSerializer.serializeToString(node);
            break;
          default:
            return;
        }
      })
    }
  })

  return result;
}

export const getNumMarche = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("numMarcheOrigine")[0].innerHTML;
}

export const withNumMarche = (circulation, numMarche) => {
  let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
  xmlDom.getElementsByTagName("numMarcheOrigine")[0].innerHTML = numMarche;
  return ({
    ...circulation,
    etatCirculation: xmlSerializer.serializeToString(xmlDom) 
  })
}

export const getCodeTCT = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    return xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML;
}

export const withCodeTCT = (circulation, tctId, tctCode) => {
    let xmlDom = xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("id")[0].innerHTML = tctId;
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("code")[0].innerHTML = tctCode;
    xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML = tctCode;
    return ({
      ...circulation,
      typeGestion: xmlSerializer.serializeToString(xmlDom) 
    })
}
export const getHeureDepart = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML;
}

export const withHeureDepart = (circulation, heureDepart) => {
    let heureToWrite = new Date(heureDepart);
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML = heureToWrite.toISOString().slice(0,-5)+"Z";
    return ({
      ...circulation,
      etatCirculation: xmlSerializer.serializeToString(xmlDom) 
    })
}

export const getDepart = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.mission, "application/xml");
    return xmlDom.getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission")[0]
        .getElementsByTagName("pr")[0].getAttribute("id");
}

export const getArrivee = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.mission, "application/xml");
    const Etapes = xmlDom.getElementsByTagName("etapesMission")[0]
        .getElementsByTagName("EtapeMission");
    return Etapes[Etapes.length - 1].getElementsByTagName("pr")[0].getAttribute("id");
}

export const getCirculationXmlText = (circulation) => {
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

export const concatAllCirculationsAsText = (circulationsById) => {
  var text = "<circulations>\n";

  Object.keys(circulationsById).forEach((id) => {
      text += getCirculationXmlText(circulationsById[id]);
  });

  text += "</circulations>";
  return text;
}