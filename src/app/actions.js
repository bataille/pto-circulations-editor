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