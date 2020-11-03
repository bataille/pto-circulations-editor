const xmlParser = new DOMParser();

export const xmlTextToPtxObject = (xmlText, defaultPTxObject) => {
  let result = {};
  let xmlDoc = xmlParser.parseFromString(xmlText, "application/xml");
  let ptxs = xmlDoc.getElementsByTagName("PlancheTravaux");

  Array.from(ptxs).forEach((ptx) => {
    var currentId = ptx.getElementsByTagName("id")[0].innerHTML;
    result[currentId] = {
      id: currentId,
      ptx: ptx.innerHTML,
      ...defaultPTxObject
    }
  })

  return result;
}

export const getPtxXmlText = (ptx) => {
  var ptxText = "<PlancheTravaux>\n";
  ptxText += ptx + "\n";
  ptxText += "</PlancheTravaux>\n";

  return ptxText;
}

export const concatAllPtxsAsText = (ptxsById) => {
  var text = "<planchesTravaux>\n";

  Object.keys(ptxsById).forEach((id) => {
    text += getPtxXmlText(ptxsById[id]);
  });

  text += "</planchesTravaux>";
  return text;
}