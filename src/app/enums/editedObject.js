import { circulationXmlTools, ptxXmlTools } from '../tools/xmlTools'

export const editedObject = {
    NONE: 'none',
    CIRCULATIONS: 'circulations',
    PTX: "ptx",
    ENCHAINEMENTS: "enchainements"
}

export const getEditedObjectXmlTools = (edited) => {
    switch (edited) {
        case editedObject.CIRCULATIONS:
            return circulationXmlTools;
        case editedObject.PTX:
            return ptxXmlTools;
        default:
            throw new Error('Edited object has no associated XML tools.');
    }
}

export const getEditedObjectState = (state) => {
    switch (state.editedObject) {
        case editedObject.CIRCULATIONS:
            return state.circulationsById;
        case editedObject.PTX:
            return state.ptxsById;
        default:
            throw new Error('Edited object has no associated XML tools.');
    }
}