import { produce } from 'immer'
import { v1 as uuidv1 } from 'uuid';
import { xmlTextToCirculationsObject, getHeureDepart, withNumMarche, withHeureDepart, withCodeTCT } from '../tools/CirculationXmlTools'

const defaultCirculationObject = {
  selected: false,
  extended: false,
  numMarcheEdited: false,
  heureDepartEdited: false,
  codeTctEdited: false
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
    case 'CIRCULATION_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = {
          ...draftState[action.id],
          ...action.circulation
        };
      })
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
      return duplicateSelectedCirculations(state);
    case 'NUM_MARCHE_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].numMarcheEdited = true; });
    case 'STOP_NUM_MARCHE_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].numMarcheEdited = false; });
    case 'CIRCULATION_NUM_MARCHE_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = withNumMarche(draftState[action.id], action.numMarche);
        draftState[action.id].numMarcheEdited = false;
      });
    case 'HEURE_DEPART_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].heureDepartEdited = true; });
    case 'STOP_HEURE_DEPART_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].heureDepartEdited = false; });
    case 'CIRCULATION_HEURE_DEPART_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = withHeureDepart(draftState[action.id], action.heureDepart);
        draftState[action.id].heureDepartEdited = false;
      });
    case 'TCT_CELL_CLICKED':
      return produce(state, draftState => { draftState[action.id].codeTctEdited = true; });
    case 'STOP_TCT_CELL_EDITION':
      return produce(state, draftState => { draftState[action.id].codeTctEdited = false; });
    case 'CIRCULATION_TCT_CHANGED':
      return produce(state, draftState => {
        draftState[action.id] = withCodeTCT(draftState[action.id], action.tctId, action.tctCode);
        draftState[action.id].codeTctEdited = false;
      });
    case 'FAN_HEURE_DEPART_VALIDATED':
      return fanHeureDepart(state, action.start, action.secondsIncrement);
    case 'FAN_NUM_MARCHE_VALIDATED':
      return fanNumMarche(state, action.start, action.increment);
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
  var currentDate = new Date(start);
  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      if (draftState[id].selected) {
        draftState[id] = withHeureDepart(draftState[id], currentDate);
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
        draftState[id] = withNumMarche(draftState[id], currentId);
        currentId += increment;
      }
    })
  });
}

const shiftDate = (state, start, goal) => {
  const startDate = new Date(start);
  const goalDate = new Date(goal);
  const delta = goalDate - startDate;

  return produce(state, draftState => {
    Object.keys(draftState).forEach((id) => {
      const origDate = new Date(getHeureDepart(draftState[id]));
      draftState[id] = withHeureDepart(draftState[id], (new Date(origDate.getTime() + delta)));
    });
  });
}

export default circulationsById