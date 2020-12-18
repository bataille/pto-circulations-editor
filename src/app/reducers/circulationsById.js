import { produce } from 'immer'
import { circulationXmlTools } from '../tools/xmlTools'
import { defaultObject, defaultObjectsById } from './defaultObjectsById'

const defaultCirculationObject = {
  ...defaultObject,
  numMarcheEdited: false,
  heureDepartEdited: false,
  heureArriveeEdited: false,
  codeTctEdited: false
}

const circulationsById = (state = {}, action) => {
  switch (action.type) {
    case 'CIRCULATION_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = {
          ...draftState[action.id],
          ...action.circulation
        };
      })
    case 'NUM_MARCHE_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].numMarcheEdited = true; });
    case 'STOP_NUM_MARCHE_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].numMarcheEdited = false; });
    case 'CIRCULATION_NUM_MARCHE_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = circulationXmlTools.withNumMarche(draftState[action.id], action.numMarche);
        draftState[action.id].numMarcheEdited = false;
      });
    case 'HEURE_DEPART_CELL_CLICKED':
      return produce(state, draftState => {
        draftState[action.id].heureDepartEdited = true;
        draftState[action.id].heureArriveeEdited = false;
      });
    case 'STOP_HEURE_DEPART_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].heureDepartEdited = false; });
    case 'HEURE_ARRIVEE_CELL_CLICKED':
      return produce(state, draftState => {
        draftState[action.id].heureArriveeEdited = true;
        draftState[action.id].heureDepartEdited = false;
      });
    case 'STOP_HEURE_ARRIVEE_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].heureArriveeEdited = false; });
    case 'CIRCULATION_HEURE_DEPART_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = circulationXmlTools.withHeureDepart(draftState[action.id], action.heureDepart);
        draftState[action.id].heureDepartEdited = false;
        draftState[action.id].heureArriveeEdited = false;
      });
    case 'TCT_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].codeTctEdited = true; });
    case 'STOP_TCT_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].codeTctEdited = false; });
    case 'CIRCULATION_TCT_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = circulationXmlTools.withCodeTCT(draftState[action.id], action.tctId, action.tctCode);
        draftState[action.id].codeTctEdited = false;
      });
    case 'FAN_HEURE_DEPART_VALIDATED':
      return fanHeureDepart(state, action.start, action.secondsIncrement);
    case 'FAN_NUM_MARCHE_VALIDATED':
      return fanNumMarche(state, action.start, action.increment);
    default:
      return defaultObjectsById(state, action, circulationXmlTools, defaultCirculationObject);
  }
}

const fanHeureDepart = (state, start, secondsIncrement) => {
  var currentDate = new Date(start);
  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      if (draftState[id].selected) {
        draftState[id] = circulationXmlTools.withHeureDepart(draftState[id], currentDate);
        currentDate.setSeconds(currentDate.getSeconds() + secondsIncrement);
      }
    });
  });
}

const fanNumMarche = (state, start, increment) => {
  var currentId = start;
  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      if (draftState[id].selected) {
        draftState[id] = circulationXmlTools.withNumMarche(draftState[id], currentId);
        currentId += increment;
      }
    })
  });
}

export default circulationsById