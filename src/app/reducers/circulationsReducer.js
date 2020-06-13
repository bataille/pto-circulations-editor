const circulationsReducer = (state, action) => {
  switch (action.type) {
    case 'XML_FILE_SUBMITED':
      let circulationsToAdd = xmlTextToCirculationsObject(action.xmlText);
      return ({
        ...state,
        circulationsById: {
          ...state.circulationsById,
          ...circulationsToAdd
        }
      })
    case 'CIRCULATION_CHANGED':
      return ({
        ...state,
        circulationsById: {
          ...state.circulationsById,
          [action.id]: {
            ...state.circulationsById[action.id],
            ...action.circulation
          }
        }
      });
    case 'CIRCULATION_ROW_CLICKED_ON':
      return({
        ...state,
        circulationsById: {
          ...state.circulationsById,
          [action.id]: {
            ...state.circulationsById[action.id],
            selected: !state.circulationsById[action.id].selected
          }
        }
      })
    default:
      return state
  }
}

const xmlParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

const xmlTextToCirculationsObject = (xmlText) => {
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

export default circulationsReducer