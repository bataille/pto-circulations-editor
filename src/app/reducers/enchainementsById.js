import { produce } from 'immer'
import { enchainementXmlTools } from '../tools/xmlTools'
import { defaultObject, defaultObjectsById } from './defaultObjectsById'

const defaultEnchainementObject = {
  ...defaultObject
}

const enchainementsById = (state = {}, action) => {
  switch (action.type) {
    case 'GUID_MAP_FILE_APPLIED':
      return applyGuidMapFile(state, action.guidMapText);
    default:
      return defaultObjectsById(state, action, enchainementXmlTools, defaultEnchainementObject);
  }
}

const buildCirculationsIdMap = (enchainementsById) => {
  return Object.keys(enchainementsById).reduce((result, id) => {
    return produce(result, draftResult => {
      draftResult[enchainementsById[id].elementEntrantId] = {
        ...draftResult[enchainementsById[id].elementEntrantId],
        entrant: id
      };
      draftResult[enchainementsById[id].elementSortantId] = {
        ...draftResult[enchainementsById[id].elementSortantId],
        sortant: id
      };
    });
  }, {});
}

const applyGuidMapFile = (state, guidMapText) => {
  let guidMap = JSON.parse(guidMapText);
  let circulationsIdMap = buildCirculationsIdMap(state);

  let guidToChangeList = Object.keys(guidMap).sort();
  let circulationsIdList = Object.keys(circulationsIdMap).sort();

  return produce(state, draftState => {
    let guidToChangeIndex = 0;
    let circulationsIdIndex = 0;

    while (guidToChangeIndex < guidToChangeList.length && circulationsIdIndex < circulationsIdList.length) {
      if (guidToChangeList[guidToChangeIndex] === circulationsIdList[circulationsIdIndex]) {
        let idToChange = circulationsIdMap[circulationsIdList[circulationsIdIndex]];
        if (idToChange.entrant !== undefined) {
          draftState[idToChange.entrant].elementEntrantId = guidMap[guidToChangeList[guidToChangeIndex]];
        }
        if (idToChange.sortant !== undefined) {
          draftState[idToChange.sortant].elementSortantId = guidMap[guidToChangeList[guidToChangeIndex]];
        }
        circulationsIdIndex += 1;
      } else if (guidToChangeList[guidToChangeIndex] < circulationsIdList[circulationsIdIndex]) {
        guidToChangeIndex += 1;
      } else {
        circulationsIdIndex += 1;
      }
    }
  });
}

export default enchainementsById