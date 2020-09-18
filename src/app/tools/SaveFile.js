const config = require('../../config/config.json') 

export const saveAsXmlFile = (fileName, content) => {
    const header = config.xml_header;
    const footer = config.xml_footer;

    var element = document.createElement('a');
    element.setAttribute('href',
        'data:application/xml;charset=utf-8,' + encodeURIComponent(header + content + footer));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}