import { produce } from 'immer'
import { editedObject } from '../enum'

import circulationsById from './circulationsById'
import main from './main'

const reducer = (state = { editedObject: editedObject.NONE }, action) => {
    switch (action.type) {
        case 'XML_FILE_SUBMITED':
            let edited = getXmlFileObject(action.xmlText);
            return produce(state, draftState => {
                draftState.editedObject = edited;
                draftState.circulationsById = circulationsById(state.circulationsById, action);
            });
        default:
            return produce(state, draftState => {
                draftState.main = main(state.main, action);
                if (state.editedObject === editedObject.CIRCULATIONS) {
                    draftState.circulationsById = circulationsById(state.circulationsById, action);
                }
            });
    }

}

const getXmlFileObject = (xmlText) => {
    let searchedString = xmlText.slice(0, 100);
    if (searchedString.includes("<circulations>")) {
        return editedObject.CIRCULATIONS;
    } else {
        return editedObject.NONE;
    }
}
export default reducer;