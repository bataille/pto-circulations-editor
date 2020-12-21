export class GenericXmlTools {

    constructor(xmlParser, xmlSerializer, elementsTagName, elementTagName) {
        if (this.constructor === GenericXmlTools) {
            throw new TypeError('Abstract class "GenericXmlTools" cannot be instantiated directly');
        }
        this.xmlParser = xmlParser;
        this.xmlSerializer = xmlSerializer;
    }

    elementsTagName = "<elementsTagName>";
    elementTagName = "<elementTagName>";

    getElementId = (element) => {
        return element.getElementsByTagName("id")[0].innerHTML;
    }

    setElementId = (elementXml, id) => {
        elementXml.getElementsByTagName("id")[0].innerHTML = id;
    }

    xmlTextToElementsObject = (xmlText, defaultObject) => {
        let result = {};
        let xmlDoc = this.xmlParser.parseFromString(xmlText, "application/xml");
        let elements = xmlDoc.getElementsByTagName(this.elementTagName);

        Array.from(elements).forEach((element) => {
            var currentId = this.getElementId(element);
            result[currentId] = {
                id: currentId,
                origineId: currentId,
                content: element.outerHTML,
                ...defaultObject
            }
        })

        return result;
    }

    getElementAsXmlText = (element) => {
        return element.content;
    } 

    concatAllElementsAsXmlText = (elementsById) => {
        var text = "<" + this.elementsTagName + ">\n";

        Object.keys(elementsById).forEach((id) => {
            text += this.getElementAsXmlText(elementsById[id]);
        });

        text += "</" + this.elementsTagName + ">";
        return text;
    }

    withId = (element, id) => {
        let xmlDom = this.xmlParser.parseFromString(element.content, "application/xml");
        this.setElementId(xmlDom, id);
        return ({
            ...element,
            id: id,
            content: this.xmlSerializer.serializeToString(xmlDom)
        })
    }

    getHeure = (element) => {
        return new Date(Date.now());
    }

    withHeure = (element, date) => {
        return element;
    }

}