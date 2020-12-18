import { produce } from 'immer'
import { v1 as uuidv1 } from 'uuid';
import { ptxXmlTools } from '../tools/xmlTools'

const defaultPtxObject = {
  selected: false,
  extended: false,
  dateHeureDebutEdited: false,
}

const ptxsById = (state = {}, action) => {
  switch (action.type) {
    case 'XML_FILE_SUBMITED':
      let ptxsToAdd = ptxXmlTools.xmlTextToElementsObject(action.xmlText, defaultPtxObject);
      return ({
        ...state,
        ...ptxsToAdd
      });
      case 'SELECT_ALL':
        return produce(state, draftState => {
          Object.keys(draftState).forEach((id => { draftState[id].selected = true; }));
        });
      case 'UNSELECT_ALL':
        return produce(state, draftState => {
          Object.keys(draftState).forEach((id => { draftState[id].selected = false; }));
        });
      case 'FLIP_SELECT_ALL':
        return produce(state, draftState => {
          Object.keys(draftState).forEach((id => {
            draftState[id].selected = !(draftState[id].selected);
          }));
        });
      case 'ROW_CLICKED_ON':
        return produce(state, draftState => {
          if (draftState[action.id] != null) {
            draftState[action.id].selected = !(draftState[action.id].selected);
          }
        });
      case 'ROW_DELETED':
        return omit(action.id, state);
      case 'DELETE_SELECTED_BUTTON_PRESSED':
        return filterObject(state, (circulation) => { return !circulation.selected; });
      case 'ROW_DUPLICATED':
        return Object.keys(state).reduce((result, id) => {
          if (id === action.id) {
            let newId = uuidv1();
            return ({
              ...result,
              [id]: state[id],
              [newId]: {
                ...state[id],
                id: newId,
                selected: false
              }
            })
          } else {
            return ({ ...result, [id]: state[id] })
          }
        }, {});
      case 'DUPLICATE_SELECTED_BUTTON_PRESSED':
        return duplicateSelectedPtx(state);
      case 'CHANGE_ID_SELECTED_BUTTON_PRESSED':
        return changeIdSelectedPtx(state);
      case 'SHIFT_DATE_VALIDATED':
        return shiftDate(state, action.start, action.goal);
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
        return state
    }
}

const omit = (keyToOmit, { [keyToOmit]: _, ...omittedPropObj } = {}) => omittedPropObj;

const filterObject = (object, filterFunction) => {
  let filtered = {};
  Object.keys(object).forEach((key) => {
    if (filterFunction(object[key])) {
      filtered[key] = object[key];
    }
  })
  return filtered;
}

const duplicateSelectedPtx = (state) => {
  return Object.keys(state).reduce((result, id) => {
    if (state[id].selected) {
      let newId = uuidv1();
      return ({
        ...result,
        [id]: state[id],
        [newId]: {
          ...state[id],
          id: newId,
          selected: false
        }
      })
    } else {
      return ({ ...result, [id]: state[id] })
    }
  }, {});
}

const changeIdSelectedPtx = (state) => {
  return Object.keys(state).reduce((result, id) => {
    if (state[id].selected) {
      let newId = uuidv1();
      return ({
        ...result,
        [newId]: ptxXmlTools.withId(state[id], newId)
      })
    } else {
      return ({ ...result, [id]: state[id] })
    }
  }, {});
}

const shiftDate = (state, start, goal) => {
  const startDate = new Date(start);
  const goalDate = new Date(goal);
  const delta = goalDate - startDate;

  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      const origDate = new Date(ptxXmlTools.getDateHeureDebut(draftState[id]));
      draftState[id] = ptxXmlTools.withDateHeureDebut(draftState[id], (new Date(origDate.getTime() + delta)));
    });
  });
}

export default ptxsById