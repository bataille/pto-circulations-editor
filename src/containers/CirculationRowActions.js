import React from 'react'
import { connect } from 'react-redux'
import { deleteCirculation } from '../app/actions'

import { Trash } from 'react-bootstrap-icons';

class CirculationRowAction extends React.Component {

  render() {
    return (
      <div>
        <a href="#"
          onClick={() => { this.props.dispatch(deleteCirculation(this.props.id)) }}
          className="text-secondary" >
          <Trash />
        </a>
      </div>
    );
  }

}

export default connect()(CirculationRowAction)