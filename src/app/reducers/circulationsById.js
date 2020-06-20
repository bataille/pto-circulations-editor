import { v1 as uuidv1 } from 'uuid';
import { xmlTextToCirculationsObject, withNumMarche, withHeureDepart } from '../tools/CirculationXmlTools'

const defaultCirculationObject = {
  selected: false,
  extended: false,
  numMarcheEdited: false,
  heureDepartEdited: false
}

const circulationsById = (state = {}, action) => {
  switch (action.type) {
    case 'XML_FILE_SUBMITED':
      let circulationsToAdd = xmlTextToCirculationsObject(action.xmlText, defaultCirculationObject);
      return ({
        ...state,
        ...circulationsToAdd
      });
    case 'SELECT_ALL':
      return Object.keys(state).reduce((result, id) => {
        result[id] = {
          ...state[id],
          selected: true
        };
        return result;
      }, {});
    case 'UNSELECT_ALL':
      return Object.keys(state).reduce((result, id) => {
        result[id] = {
          ...state[id],
          selected: false
        };
        return result;
      }, {});
    case 'FLIP_SELECT_ALL':
      return Object.keys(state).reduce((result, id) => {
        result[id] = {
          ...state[id],
          selected: !(state[id].selected)
        };
        return result;
      }, {});
    case 'CIRCULATION_CHANGED':
      return ({
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.circulation
        }
      });
    case 'CIRCULATION_ROW_CLICKED_ON':
      if (state[action.id] != null) {
        return ({
          ...state,
          [action.id]: {
            ...state[action.id],
            selected: !state[action.id].selected
          }
        })
      } else return state;
    case 'CIRCULATION_DELETED':
      return omit(action.id, state);
    case 'DELETE_SELECTED_BUTTON_PRESSED':
      return filterObject(state, (circulation) => { return !circulation.selected; });
    case 'CIRCULATION_DUPLICATED':
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
      return duplicateSelectedCirculations(state);
    case 'NUM_MARCHE_CELL_CLICKED':
      return ({
        ...state,
        [action.id]: {
          ...state[action.id],
          numMarcheEdited: true
        }
      });
    case 'STOP_NUM_MARCHE_CELL_EDITION':
      return ({
        ...state,
        [action.id]: {
          ...state[action.id],
          numMarcheEdited: false
        }
      });
    case 'CIRCULATION_NUM_MARCHE_CHANGED':
      return ({
        ...state,
        [action.id]: {
          ...withNumMarche(state[action.id], action.numMarche),
          numMarcheEdited: false
        }
      });
    case 'HEURE_DEPART_CELL_CLICKED':
      return ({
        ...state,
        [action.id]: {
          ...state[action.id],
          heureDepartEdited: true
        }
      });
    case 'STOP_HEURE_DEPART_CELL_EDITION':
      return ({
        ...state,
        [action.id]: {
          ...state[action.id],
          heureDepartEdited: false
        }
      })
    case 'CIRCULATION_HEURE_DEPART_CHANGED':
      return ({
        ...state,
        [action.id]: {
          ...withHeureDepart(state[action.id], action.heureDepart),
          heureDepartEdited: false
        }
      })
    case 'FAN_HEURE_DEPART_VALIDATED':
      return fanHeureDepart(state, action.start, action.secondsIncrement);
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

const fanHeureDepart = (state, start, secondsIncrement) => {
  let { result } = Object.keys(state).reduce((acc, id) => {
    if (state[id].selected) {
      let newAcc = ({
        ...acc,
        result: {
          ...acc.result,
          [id]: withHeureDepart(state[id], acc.currentDate) 
        }
      });
      newAcc.currentDate.setSeconds(acc.currentDate.getSeconds() + secondsIncrement);
      return newAcc;
    } else {
      return ({ ...acc, result: { ...acc.result, [id]: state[id] } });
    }
  }, {
    currentDate: new Date(start),
    start, result: ({})
  });
  return result;
}


export default circulationsById