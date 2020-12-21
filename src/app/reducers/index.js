import { produce } from 'immer'
import { editedObject } from '../enums/editedObject'

import circulationsById from './circulationsById'
import enchainementsById from './enchainementsById'
import ptxsById from './ptxsById'
import main from './main'

const reducer = (state = { editedObject: editedObject.NONE }, action) => {
    switch (action.type) {
        case 'XML_FILE_SUBMITED':
            let edited = getXmlFileObject(action.xmlText);
            state = produce(state, draftState => {
                draftState.editedObject = edited;
            });
            // caution: break is omitted intentionally - fallthrough to default
        default:
            return produce(state, draftState => {
                draftState.main = main(state.main, action);
                if (state.editedObject === editedObject.CIRCULATIONS) {
                    draftState.circulationsById = circulationsById(state.circulationsById, action);
                } else if (state.editedObject === editedObject.PTX) {
                    draftState.ptxsById = ptxsById(state.ptxsById, action);
                } else if (state.editedObject === editedObject.ENCHAINEMENTS) {
                    draftState.enchainementsById = enchainementsById(state.enchainementsById, action);
                }
            });
    }
}

const getXmlFileObject = (xmlText) => {
    let searchedString = xmlText.slice(0, 100);
    if (searchedString.includes("<circulations>")) {
        return editedObject.CIRCULATIONS;
    } else if (searchedString.includes("<planchesTravaux>")) {
        return editedObject.PTX;
    } else if (searchedString.includes("<vueOffreEnchainementElementaires>")) {
        return editedObject.ENCHAINEMENTS;
    } else {
        return editedObject.NONE;
    }
}
export default reducer;