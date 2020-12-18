import React from 'react'
import { connect } from 'react-redux'
import { submitXmlFile } from '../../app/actions'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import Button from 'react-bootstrap/Button'
import { Download } from 'react-bootstrap-icons';

class LoadButton extends React.Component {

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    Promise.all(Array.from(event.target.files).map((file) => { return file.text(); }))
      .then(textArray => {
        textArray.forEach(textFile => { this.props.dispatch(submitXmlFile(textFile)); });
      });
  }

  render() {
    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id="load-button-tooltip" {...props}>
            Charger un ou plusieurs fichiers à éditer
          </Tooltip>)}
      >
        <Button variant="primary" className={this.props.className} size={this.props.size}
          disabled={this.props.isLoading}
          onClick={() => { if (!this.props.isLoading) { this.upload.click() } }}>
          <input type="file" id="inputFiles"
            ref={(ref) => this.upload = ref}
            style={{ display: "none" }}
            onChange={this.onChangeFile.bind(this)} multiple />
          <Download />
          {this.props.buttonText}
        </Button >
      </OverlayTrigger>
    );
  }

}

const mapState = (state) => {
  return { isLoading: state.main.loadingInfo.isLoading }
}

export default connect(mapState)(LoadButton)