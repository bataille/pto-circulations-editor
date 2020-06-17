const xmlParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export const xmlTextToCirculationsObject = (xmlText) => {
  let result = {}
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
              id: node.innerHTML,
              selected: false,
              extended: false
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

export const getCodeTCT = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.typeGestion, "application/xml");
    return xmlDom.getElementsByTagName("tct")[0].getElementsByTagName("libelle")[0].innerHTML;
}

export const getHeureDepart = (circulation) => {
    let xmlDom = xmlParser.parseFromString(circulation.etatCirculation, "application/xml");
    return xmlDom.getElementsByTagName("dateHeureOrigine")[0].innerHTML;
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
