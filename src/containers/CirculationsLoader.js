import React from 'react'
import { connect } from 'react-redux'
import { submitXmlFile } from '../app/actions'

import Button from 'react-bootstrap/Button'
import { Download } from 'react-bootstrap-icons';

class CirculationsLoader extends React.Component {

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    Array.from(event.target.files).forEach((file) => {
      file.text().then((fileText) => {
        this.props.dispatch(submitXmlFile(fileText));
      });
    });
  }

  render() {
    return (
      <Button variant="primary"
        onClick={() => { this.upload.click() }}>
        <input type="file" id="circulationsFiles"
          ref={(ref) => this.upload = ref}
          style={{ display: "none" }}
          onChange={this.onChangeFile.bind(this)} multiple />
        <Download />
      </Button >
    );
  }

}

export default connect()(CirculationsLoader)