import React from 'react'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { FileCode } from 'react-bootstrap-icons';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

import { getEditedObjectState } from '../../app/enums/editedObject'
import { buildGuidJsonMap } from '../../app/tools/buildGuidJsonMap'
import { saveAsJsonFile } from '../../app/tools/saveFile'

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

class SaveGuidMapButton extends React.Component {

    constructor(props) {
        super(props);
        this.fileName = dateStringForFileName() + "_correspondances_guid.json";
        this.handleValidate = this.handleValidate.bind(this);
    }

    getCurrentFileName() {
        return dateStringForFileName() + "_correspondances_guid.json";
    }

    handleValidate() {
        var jsonGuidMap = buildGuidJsonMap(getEditedObjectState(this.props.state));
        saveAsJsonFile(this.fileName, JSON.stringify(jsonGuidMap));
    }

    render() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                trigger="click"
                rootClose={true}
                overlay={(props) => (
                    <Popover id="save-guidmap-name-popover" placement="bottom" {...props}>
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
                <Button variant="light" className={this.props.className}
                    onClick={() => { this.fileName = this.getCurrentFileName(); }}
                    disabled={!this.props.guidChanged}
                >
                    <FileCode />
                </Button >
            </OverlayTrigger>
        );
    }

}

const mapStateToProps = state => {
    return ({
        guidChanged: state.main.guidChanged,
        state: state
    })
}

export default connect(mapStateToProps)(SaveGuidMapButton)
