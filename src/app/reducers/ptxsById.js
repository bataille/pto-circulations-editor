import { produce } from 'immer'
import { ptxXmlTools } from '../tools/xmlTools'
import { defaultObject, defaultObjectsById } from './defaultObjectsById'

const defaultPtxObject = {
  ...defaultObject,
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
      default:
        return defaultObjectsById(state, action, ptxXmlTools, defaultPtxObject);
    }
}

export default ptxsById