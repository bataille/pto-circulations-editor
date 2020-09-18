import React from 'react'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Upload } from 'react-bootstrap-icons';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Check } from 'react-bootstrap-icons';

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

    handleValidate() {
        saveAsXmlFile(this.fileName, concatAllCirculationsAsText(this.props.circulations));
    }

    render() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                trigger="click"
                rootClose="true"
                overlay={(props) => (
                    <Popover id="save-name-popover" placement="bottom" {...props}>
                        <Popover.Title as="h3">Nom du fichier</Popover.Title>
                        <Popover.Content>
                            <InputGroup className={this.props.className}>
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
                onClick={() => { this.fileName = dateStringForFileName() + "_circulations.xml"; }}
                >
                    <Upload />
                </Button >
            </OverlayTrigger>
        );
    }

}

const mapStateToProps = state => {
    return ({
        circulations: state.circulationsById
    })
}

export default connect(mapStateToProps)(SaveButton)
