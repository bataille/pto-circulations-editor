import React from 'react'
import { connect } from 'react-redux'

import { duplicateCirculation } from '../app/actions'
import { deleteCirculation } from '../app/actions'

import { Files } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

class CirculationRowAction extends React.Component {

  render() {
    return (
      <div className={this.props.className}>
        <a href="#"
          onClick={(event) => {
            this.props.dispatch(duplicateCirculation(this.props.id));
            event.stopPropagation();
          }}
          className="text-secondary mr-1" >
          <Files />
        </a>
        <a href="#"
          onClick={(event) => {
            this.props.dispatch(deleteCirculation(this.props.id));
            event.stopPropagation();
          }}
          className="text-secondary" >
          <Trash />
        </a>
      </div>
    );
  }

}

export default connect()(CirculationRowAction)