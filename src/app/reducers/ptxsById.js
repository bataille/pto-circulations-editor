import { produce } from 'immer'
import { ptxXmlTools } from '../tools/xmlTools'
import { defaultObject, defaultObjectsById } from './defaultObjectsById'

const defaultPtxObject = {
  ...defaultObject,
  numeroPlancheEdited: false,
  dateHeureDebutEdited: false,
}

const ptxsById = (state = {}, action) => {
  switch (action.type) {
    case 'DATE_HEURE_DEBUT_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].dateHeureDebutEdited = true; });
    case 'STOP_DATE_HEURE_DEBUT_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].dateHeureDebutEdited = false; });
    case 'DATE_HEURE_DEBUT_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = ptxXmlTools.withDateHeureDebut(draftState[action.id], action.dateHeureDebut);
        draftState[action.id].dateHeureDebutEdited = false;
      });
    case 'NUMERO_PLANCHE_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].numeroPlancheEdited = true; });
    case 'STOP_NUMERO_PLANCHE_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].numeroPlancheEdited = false; });
    case 'PTX_NUMERO_PLANCHE_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = ptxXmlTools.withNumeroPlanche(draftState[action.id], action.numeroPlanche);
        draftState[action.id].numeroPlancheEdited = false;
      });
    default:
      return defaultObjectsById(state, action, ptxXmlTools, defaultPtxObject);
  }
}

export default ptxsById