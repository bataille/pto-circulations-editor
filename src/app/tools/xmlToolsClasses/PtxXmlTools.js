import { GenericXmlTools } from './GenericXmlTools'

export class PtxXmlTools extends GenericXmlTools {

  elementsTagName = "planchesTravaux";
  elementTagName = "PlancheTravaux";

  getPtxRessourcesInfraType = (ptx) => {
    let xmlDom = this.xmlParser.parseFromString(ptx.content, "application/xml");
    let ressourcesType = xmlDom.getElementsByTagName("ressourcesInfra")[0].firstElementChild.tagName;
    return ressourcesType;
  }

  getPtxRessourcesDescription = (ptx) => {
    let xmlDom = this.xmlParser.parseFromString(ptx.content, "application/xml");
    return xmlDom.getElementsByTagName("ressourcesInfra")[0].firstElementChild.getElementsByTagName("libelle")[0].innerHTML;
  }

  getDateHeureDebut = (ptx) => {
    let xmlDom = this.xmlParser.parseFromString(ptx.content, "application/xml");
    return xmlDom.getElementsByTagName("dateHeureDebut")[0].innerHTML;
  }

  withDateHeureDebut = (ptx, dateHeureDebut) => {
    let heureToWrite = new Date(dateHeureDebut);
    let xmlDom = this.xmlParser.parseFromString(ptx.content, "application/xml");
    xmlDom.getElementsByTagName("dateHeureDebut")[0].innerHTML = heureToWrite.toISOString().slice(0, -5) + "Z";
    return ({
      ...ptx,
      content: this.xmlSerializer.serializeToString(xmlDom)
    })
  }

  getHeure = this.getDateHeureDebut;

}