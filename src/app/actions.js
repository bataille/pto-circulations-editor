let nextCirculationId = 0

export const addCirculation = (circulationXml) => ({
  type: 'ADD_CIRCULATION',
  id: nextCirculationId++,
  xml: circulationXml
})

export const changeCirculationXML = (id, circulationXml) => ({
  type: 'CHANGE_CIRCULATION_XML',
  id: id,
  xml: circulationXml
})
