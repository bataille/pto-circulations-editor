export const submitXmlFile = (xmlText) => ({
  type: 'XML_FILE_SUBMITED',
  xmlText: xmlText
})

export const changeCirculation = (id, circulation) => ({
  type: 'CIRCULATION_CHANGED',
  id: id,
  circulation: circulation
})

export const clickOnCirculationRow = (id) => ({
  type: 'CIRCULATION_ROW_CLICKED_ON',
  id: id
})

export const deleteCirculation = (id) => ({
  type: 'CIRCULATION_DELETED',
  id: id
})

export const deleteSelected = () => ({
  type: 'DELETE_SELECTED_BUTTON_PRESSED',
})

export const duplicateCirculation = (id) => ({
  type: 'CIRCULATION_DUPLICATED',
  id: id
})

export const duplicateSelected = () => ({
  type: 'DUPLICATE_SELECTED_BUTTON_PRESSED',
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