import React from 'react'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Upload } from 'react-bootstrap-icons';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

import { editedObject } from '../../app/enum'
import { concatAllCirculationsAsText } from '../../app/tools/CirculationXmlTools'
import { saveAsXmlFile } from '../../app/tools/SaveFile'

const dateStringForFileName = () => {
    let now = new Date();
    var result = "";

    result += now.getFullYear();
    result += String(now.getMonth()).padStart(2, '0')
    result += String(now.getDate()).padStart(2, '0');
    result += "T";
    result += String(now.getHours()).padStart(2, '0');
    result += String(now.getMinutes()).padStart(2, '0');

    return result;
}

class SaveButton extends React.Component {

    constructor(props) {
        super(props);
        this.fileName = dateStringForFileName() + "_circulations.xml";
        this.handleValidate = this.handleValidate.bind(this);
    }

    getCurrentFileName() {
        var fileType = "";

        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                fileType = "circulations";
                break;
            default:
                fileType = "";
        }

        return dateStringForFileName() + "_" + fileType + ".xml";
    }

    handleValidate() {
        var xmlText = "";

        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                xmlText = concatAllCirculationsAsText(this.props.circulations);
                break;
            default:
                xmlText = "";
        }

        saveAsXmlFile(this.fileName, xmlText);
    }

    render() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                trigger="click"
                rootClose={ true }
                overlay={(props) => (
                    <Popover id="save-name-popover" placement="bottom" {...props}>
                        <Popover.Title as="h3">Nom du fichier</Popover.Title>
                        <Popover.Content>
                            <InputGroup className={this.props.className} style={{ width: 300 }}>
                                <FormControl
                                    defaultValue={this.fileName}
                                    aria-label="Nom du fichier"
                                    onChange={(event) => { this.fileName = event.target.value }}
                                    onClick={(event) => { event.stopPropagation() }}
                                />
                                <InputGroup.Append>
                                    <Button variant="success"
                                        onClick={(event) => {
                                            this.handleValidate();
                                            event.stopPropagation();
                                        }}>
                                        <Check />
                                    </Button >
                                </InputGroup.Append>
                            </InputGroup>
                        </Popover.Content>
                    </Popover>
                )}
            >
                <Button variant="success" className={this.props.className}
                onClick={() => { this.fileName = this.getCurrentFileName(); }}
                disabled={this.props.editedObject === editedObject.NONE}
                >
                    <Upload />
                </Button >
            </OverlayTrigger>
        );
    }

}

const mapStateToProps = state => {
    return ({
        editedObject : state.editedObject,
        circulations: state.circulationsById
    })
}

export default connect(mapStateToProps)(SaveButton)
