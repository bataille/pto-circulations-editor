const xmlParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export const xmlTextToPtxObject = (xmlText, defaultPTxObject) => {
  let result = {};
  let xmlDoc = xmlParser.parseFromString(xmlText, "application/xml");
  let ptxs = xmlDoc.getElementsByTagName("PlancheTravaux");

  Array.from(ptxs).forEach((ptx) => {
    var currentId = ptx.getElementsByTagName("id")[0].innerHTML;
    result[currentId] = {
      id: currentId,
      content: ptx.outerHTML,
      ...defaultPTxObject
    }
  })

  return result;
}

export const concatAllPtxsAsText = (ptxsById) => {
  var text = "<planchesTravaux>\n";

  Object.keys(ptxsById).forEach((id) => {
    text += ptxsById[id].content;
  });

  text += "</planchesTravaux>";
  return text;
}

export const getPtxRessourcesInfraType = (ptx) => {
  let xmlDom = xmlParser.parseFromString(ptx.content, "application/xml");
  let ressourcesType = xmlDom.getElementsByTagName("ressourcesInfra")[0].firstElementChild.tagName;
  return ressourcesType;
}

export const getPtxRessourcesDescription = (ptx) => {
  let xmlDom = xmlParser.parseFromString(ptx.content, "application/xml");
  return xmlDom.getElementsByTagName("ressourcesInfra")[0].firstElementChild.getElementsByTagName("libelle")[0].innerHTML;
}

export const getDateHeureDebut = (ptx) => {
  let xmlDom = xmlParser.parseFromString(ptx.content, "application/xml");
  return xmlDom.getElementsByTagName("dateHeureDebut")[0].innerHTML;
}

export const withDateHeureDebut = (ptx, dateHeureDebut) => {
  let heureToWrite = new Date(dateHeureDebut);
  let xmlDom = xmlParser.parseFromString(ptx.content, "application/xml");
  xmlDom.getElementsByTagName("dateHeureDebut")[0].innerHTML = heureToWrite.toISOString().slice(0, -5) + "Z";
  return ({
    ...ptx,
    content: xmlSerializer.serializeToString(xmlDom)
  })
}

export const withId = (ptx, id) => {
  let xmlDom = xmlParser.parseFromString(ptx.content, "application/xml");
  xmlDom.getElementsByTagName("id")[0].innerHTML = id;
  return ({
    ...ptx,
    id: id,
    content: xmlSerializer.serializeToString(xmlDom)
  })
}