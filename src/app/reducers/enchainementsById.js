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

const buildCirculationsIdToEnchainmentsMap = (enchainementsById) => {
  return Object.keys(enchainementsById).reduce((result, id) => {
    return produce(result, draftResult => {
      let elementEntrantId = enchainementsById[id].elementEntrantId;
      let elementSortantId = enchainementsById[id].elementSortantId;
      
      if (draftResult[elementEntrantId] === undefined) {
        draftResult[elementEntrantId] = {
          enchainementsIdWithElemAsEntrant: [],
          enchainementsIdWithElemAsSortant: []
        };
      } 
      draftResult[elementEntrantId].enchainementsIdWithElemAsEntrant.push(id);
      
      if (draftResult[elementSortantId] === undefined) {
        draftResult[elementSortantId] = {
          enchainementsIdWithElemAsEntrant: [],
          enchainementsIdWithElemAsSortant: []
        };
      }
      draftResult[elementSortantId].enchainementsIdWithElemAsSortant.push(id); 
    
    });
  }, {});
}

const applyGuidMapFile = (state, guidMapText) => {
  let guidMap = JSON.parse(guidMapText);
  let circulationsIdToEnchainementsMap = buildCirculationsIdToEnchainmentsMap(state);

  let guidToChangeList = Object.keys(guidMap).sort();
  let circulationsIdList = Object.keys(circulationsIdToEnchainementsMap).sort();

  return produce(state, draftState => {
    let guidToChangeIndex = 0;
    let circulationsIdIndex = 0;

    while (guidToChangeIndex < guidToChangeList.length && circulationsIdIndex < circulationsIdList.length) {
      if (guidToChangeList[guidToChangeIndex] === circulationsIdList[circulationsIdIndex]) {
        let enchainementsToChange = circulationsIdToEnchainementsMap[circulationsIdList[circulationsIdIndex]];
        enchainementsToChange.enchainementsIdWithElemAsEntrant.forEach(enchainementId => {
          draftState[enchainementId].elementEntrantId = guidMap[guidToChangeList[guidToChangeIndex]];
        });
        enchainementsToChange.enchainementsIdWithElemAsSortant.forEach(enchainementId => {
          draftState[enchainementId].elementSortantId = guidMap[guidToChangeList[guidToChangeIndex]];
        });
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