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