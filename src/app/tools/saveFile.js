const config = require('../../config/config.json') 

const saveAsFile = (filename, content, dataType) => {
    var element = document.createElement('a');
    element.setAttribute('href',
        dataType + ';charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export const saveAsXmlFile = (filename, content) => {
    const header = config.xml_header;
    const footer = config.xml_footer;

    saveAsFile(filename, header + content + footer, 'data:application/xml');
}

export const saveAsJsonFile = (filename, content) => {
    saveAsFile(filename, content, 'data:application/json');
}