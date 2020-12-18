import { editedObject } from '../enums/editedObject'
import { CirculationXmlTools } from './xmlToolsClasses/CirculationXmlTools'
import { PtxXmlTools } from './xmlToolsClasses/PtxXmlTools'

const xmlParser = new DOMParser();
const xmlSerializer = new XMLSerializer();

export const circulationXmlTools = new CirculationXmlTools(xmlParser, xmlSerializer);
export const ptxXmlTools = new PtxXmlTools(xmlParser, xmlSerializer);

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