import React from 'react'
import { connect } from 'react-redux'
import { submitXmlFile } from '../app/actions'

import Button from 'react-bootstrap/Button'
import { Download } from 'react-bootstrap-icons';

class CirculationsLoadButton extends React.Component {

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
      <Button variant="primary" className={this.props.className}
        disabled={this.props.isLoading}
        onClick={() => { if (!this.props.isLoading) { this.upload.click() }}}>
        <input type="file" id="circulationsFiles"
          ref={(ref) => this.upload = ref}
          style={{ display: "none" }}
          onChange={this.onChangeFile.bind(this)} multiple />
        <Download />
      </Button >
    );
  }

}

const mapState = (state) => { 
  return { isLoading: state.toolbar.loadingInfo.isLoading }
}

export default connect(mapState)(CirculationsLoadButton)