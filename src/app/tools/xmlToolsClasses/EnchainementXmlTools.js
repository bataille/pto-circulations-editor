import { GenericXmlTools } from './GenericXmlTools'

export class EnchainementXmlTools extends GenericXmlTools {

    elementsTagName = "vueOffreEnchainementElementaires";
    elementTagName = "vueOffreEnchainementElementaire";

    getElementId = (element) => {
        return element.getElementsByTagName("offreEnchainementElementaire")[0].getElementsByTagName("id")[0].innerHTML;
    }

    setElementId = (element, id) => {
        element.getElementsByTagName("offreEnchainementElementaire")[0].getElementsByTagName("id")[0].innerHTML = id;
    }

    getCirculationId = (enchainement, elementTag) => {
        let circulation = enchainement.getElementsByTagName(elementTag)[0].getElementsByTagName("circulation")[0];
        return circulation === undefined ? "Indéfini" : circulation.getElementsByTagName("id")[0].innerHTML;
    }
    
    setCirculationId = (enchainement, elementTag, id) => {
        if (id !== "Indéfini") {
            enchainement.getElementsByTagName(elementTag)[0].getElementsByTagName("circulation")[0]
                .getElementsByTagName("id")[0].innerHTML = id;
        }
    }

    getElementEntrantId = (enchainement) => { return this.getCirculationId(enchainement, "elementEntrant"); }
    getElementSortantId = (enchainement) => { return this.getCirculationId(enchainement, "elementSortant"); }

    setElementEntrantId = (enchainement, id) => { this.setCirculationId(enchainement, "elementEntrant", id); }
    setElementSortantId = (enchainement, id) => { this.setCirculationId(enchainement, "elementSortant", id); }

    xmlTextToElementsObject = (xmlText, defaultObject) => {
        let result = {};
        let xmlDoc = this.xmlParser.parseFromString(xmlText, "application/xml");
        let enchainements = xmlDoc.getElementsByTagName(this.elementTagName);

        Array.from(enchainements).forEach((enchainement) => {
            var currentId = this.getElementId(enchainement);
            result[currentId] = {
                id: currentId,
                origineId: currentId,
                content: enchainement.outerHTML,
                elementEntrantId: this.getElementEntrantId(enchainement),
                elementSortantId: this.getElementSortantId(enchainement),
                ...defaultObject
            }
        })

        return result;
    }

    getElementAsXmlText = (element) => {
        let enchainementXml = this.xmlParser.parseFromString(element.content, "application/xml");
        this.setElementEntrantId(enchainementXml, element.elementEntrantId);
        this.setElementSortantId(enchainementXml, element.elementSortantId);
        return this.xmlSerializer.serializeToString(enchainementXml);
    }
}