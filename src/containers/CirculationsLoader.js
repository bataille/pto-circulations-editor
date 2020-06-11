import React from 'react'
import { connect } from 'react-redux'
import { addCirculation } from '../app/actions'

import Button from 'react-bootstrap/Button'

class CirculationsLoader extends React.Component {

  xmlParser = new DOMParser();
 
  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    Array.from(event.target.files).forEach((file) => {
      this.parseFile(file);
    });
  }

  parseFile(file) {
    file.text().then((fileText) => {
      this.props.dispatch(addCirculation(fileText));
    })
  }

  render() {
    return (
      <Button variant="primary"
        onClick={() => { this.upload.click() }}>
        <input type="file" id="circulationsFiles"
          ref={(ref) => this.upload = ref}
          style={{ display: "none" }}
          onChange={this.onChangeFile.bind(this)} multiple />
      Charger
      </Button >
    );
  }

}

export default connect()(CirculationsLoader)