import { v1 as uuidv1 } from 'uuid';
import { xmlTextToCirculationsObject } from '../tools/CirculationXmlTools'

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
      if (state.circulationsById[action.id] != null) {
        return ({
          ...state,
          circulationsById: {
            ...state.circulationsById,
            [action.id]: {
              ...state.circulationsById[action.id],
              selected: !state.circulationsById[action.id].selected
            }
          }
        })
      } else return state;
    case 'CIRCULATION_DELETED':
      return ({
        ...state,
        circulationsById: omit(action.id, state.circulationsById)
      })
    case 'DELETE_SELECTED_BUTTON_PRESSED':
      return ({
        ...state,
        circulationsById: filterObject(state.circulationsById, (circulation) => {
          return !circulation.selected;
        })
      })
    case 'CIRCULATION_DUPLICATED':
      return ({
        ...state,
        circulationsById: Object.keys(state.circulationsById).reduce((result, id) => {
          if (id === action.id) {
            let newId = uuidv1();
            return ({
              ...result,
              [id]: state.circulationsById[id],
              [newId]: {
                ...state.circulationsById[id],
                id: newId,
                selected: false
              }
            })
          } else {
            return ({ ...result, [id]: state.circulationsById[id] })
          }
        }, {})
      })
    case 'DUPLICATE_SELECTED_BUTTON_PRESSED':
      return ({
        ...state,
        circulationsById: duplicateSelectedCirculations(state)
      })
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

const duplicateSelectedCirculations = (state) => {
  return (Object.keys(state.circulationsById)
    .reduce((result, id) => {
      if (state.circulationsById[id].selected) {
        let newId = uuidv1();
        return ({
          ...result,
          [id]: state.circulationsById[id],
          [newId]: {
            ...state.circulationsById[id],
            id: newId,
            selected: false
          }
        })
      } else {
        return ({ ...result, [id]: state.circulationsById[id] })
      }
    }, {}));
}


export default circulationsReducer