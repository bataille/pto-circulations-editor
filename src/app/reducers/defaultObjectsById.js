import { produce } from 'immer'
import { v1 as uuidv1 } from 'uuid';

export const defaultObject = {
  selected: false,
  extended: false,
  id: undefined,
  origineId: undefined
}

export const defaultObjectsById = (state = {}, action, xmlTools, defaultObject) => {
  switch (action.type) {
    case 'XML_FILE_SUBMITED':
      let objectsToAdd = xmlTools.xmlTextToElementsObject(action.xmlText, defaultObject);
      return ({
        ...state,
        ...objectsToAdd
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
        return filterObject(state, (element) => { return !element.selected; });
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
                originedId: undefined,
                selected: false
              }
            })
          } else {
            return ({ ...result, [id]: state[id] })
          }
        }, {});
      case 'DUPLICATE_SELECTED_BUTTON_PRESSED':
        return duplicateSelectedElement(state);
      case 'CHANGE_ID_SELECTED_BUTTON_PRESSED':
        return changeIdSelectedElement(state, xmlTools);
      case 'SHIFT_DATE_VALIDATED':
        return shiftDate(state, action.start, action.goal, xmlTools);
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

const duplicateSelectedElement = (state) => {
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

const changeIdSelectedElement = (state, xmlTools) => {
  return Object.keys(state).reduce((result, id) => {
    if (state[id].selected) {
      let newId = uuidv1();
      return ({
        ...result,
        [newId]: xmlTools.withId(state[id], newId)
      })
    } else {
      return ({ ...result, [id]: state[id] })
    }
  }, {});
}

const shiftDate = (state, start, goal, xmlTools) => {
  const startDate = new Date(start);
  const goalDate = new Date(goal);
  const delta = goalDate - startDate;

  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      const origDate = new Date(xmlTools.getHeure(draftState[id]));
      draftState[id] = xmlTools.withHeure(draftState[id], (new Date(origDate.getTime() + delta)));
    });
  });
}

export default defaultObjectsById