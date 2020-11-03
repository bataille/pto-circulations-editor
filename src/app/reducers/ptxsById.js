import { produce } from 'immer'
import { v1 as uuidv1 } from 'uuid';
import { xmlTextToPtxObject } from '../tools/PtxXmlTools'

const defaultPtxObject = {
  selected: false,
  extended: false,
}

const ptxsById = (state = {}, action) => {
  switch (action.type) {
    case 'XML_FILE_SUBMITED':
      let ptxsToAdd = xmlTextToPtxObject(action.xmlText, defaultPtxObject);
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
      case 'SHIFT_DATE_VALIDATED':
        return shiftDate(state, action.start, action.goal);
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

const shiftDate = (state, start, goal) => {
  const startDate = new Date(start);
  const goalDate = new Date(goal);
  const delta = goalDate - startDate;

  return state;
}

export default ptxsById