export const submitXmlFile = (xmlText) => ({
  type: 'XML_FILE_SUBMITED',
  xmlText: xmlText
})

export const selectAll = () => ({
  type: 'SELECT_ALL'
})

export const unselectAll = () => ({
  type: 'UNSELECT_ALL'
})

export const flipSelectionAll = () => ({
  type: 'FLIP_SELECT_ALL'
})

export const clickOnRow = (id) => ({
  type: 'ROW_CLICKED_ON',
  id: id
})

export const deleteRow = (id) => ({
  type: 'ROW_DELETED',
  id: id
})

export const deleteSelected = () => ({
  type: 'DELETE_SELECTED_BUTTON_PRESSED',
})

export const duplicateRow = (id) => ({
  type: 'ROW_DUPLICATED',
  id: id
})

export const duplicateSelected = () => ({
  type: 'DUPLICATE_SELECTED_BUTTON_PRESSED',
})

export const changeIdSelected = () => ({
  type: 'CHANGE_ID_SELECTED_BUTTON_PRESSED',
})

export const shiftDateButtonClicked = () => ({
  type: 'SHIFT_DATE_BUTTON_CLICKED',
})

export const shiftDateClosed = () => ({
  type: 'SHIFT_DATE_CLOSED'
})

export const shiftDateValidated = (start, goal) =>  ({
  type: 'SHIFT_DATE_VALIDATED',
  start: start,
  goal: goal
})

export const changeCirculation = (id, circulation) => ({
  type: 'CIRCULATION_CHANGED',
  id: id,
  circulation: circulation
})

export const numMarcheCellClicked = (id) => ({
  type: 'NUM_MARCHE_CELL_CLICKED',
  id: id
})

export const stopNumMarcheCellEdition = (id) => ({
  type: 'STOP_NUM_MARCHE_CELL_EDITION',
  id: id
})

export const changeNumMarche = (id, numMarche) => ({
  type: 'CIRCULATION_NUM_MARCHE_CHANGED',
  id: id,
  numMarche: numMarche
})

export const heureDepartCellClicked = (id) => ({
  type: 'HEURE_DEPART_CELL_CLICKED',
  id: id
})

export const stopHeureDepartCellEdition = (id) => ({
  type: 'STOP_HEURE_DEPART_CELL_EDITION',
  id: id
})

export const changeHeureDepart = (id, heureDepart) => ({
  type: 'CIRCULATION_HEURE_DEPART_CHANGED',
  id: id,
  heureDepart: heureDepart
})

export const heureArriveeCellClicked = (id) => ({
  type: 'HEURE_ARRIVEE_CELL_CLICKED',
  id: id
})

export const stopHeureArriveeCellEdition = (id) => ({
  type: 'STOP_HEURE_ARRIVEE_CELL_EDITION',
  id: id
})

export const codeTctCellClicked = (id) => ({
  type: 'TCT_CELL_CLICKED',
  id: id
})

export const stopCodeTctCellEdition = (id) => ({
  type: 'STOP_TCT_CELL_EDITION',
  id: id
})

export const changeCodeTct = (id, tctId, tctCode) => ({
  type: 'CIRCULATION_TCT_CHANGED',
  id: id,
  tctId: tctId,
  tctCode: tctCode
})

export const fanHeureDepartButtonClicked = () => ({
  type: 'FAN_HEURE_DEPART_BUTTON_CLICKED',
})

export const fanHeureDepartClosed = () => ({
  type: 'FAN_HEURE_DEPART_CLOSED'
})

export const fanHeureDepartValidated = (start, secondsIncrement) =>  ({
  type: 'FAN_HEURE_DEPART_VALIDATED',
  start: start,
  secondsIncrement: secondsIncrement
})

export const fanNumMarcheButtonClicked = () => ({
  type: 'FAN_NUM_MARCHE_BUTTON_CLICKED',
})

export const fanNumMarcheClosed = () => ({
  type: 'FAN_NUM_MARCHE_CLOSED'
})

export const fanNumMarcheValidated = (start, increment) =>  ({
  type: 'FAN_NUM_MARCHE_VALIDATED',
  start: start,
  increment: increment
})

export const dateHeureDebutCellClicked = (id) => ({
  type: 'DATE_HEURE_DEBUT_CELL_CLICKED',
  id: id
})

export const stopDateHeureDebutCellEdition = (id) => ({
  type: 'STOP_DATE_HEURE_DEBUT_CELL_EDITION',
  id: id
})

export const changeDateHeureDebut = (id, heureDebut) => ({
  type: 'DATE_HEURE_DEBUT_CHANGED',
  id: id,
  dateHeureDebut: heureDebut
})

export const applyGuidMapFile = (guidMapText) => ({
  type: 'GUID_MAP_FILE_APPLIED',
  guidMapText: guidMapText
})