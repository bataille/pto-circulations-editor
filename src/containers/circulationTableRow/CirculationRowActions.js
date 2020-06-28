import React from 'react'
import { connect } from 'react-redux'

import { duplicateCirculation } from '../../app/actions'
import { deleteCirculation } from '../../app/actions'

import Button from 'react-bootstrap/Button'
import { Files } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

class CirculationRowAction extends React.Component {

  render() {
    return (
      <div className={this.props.className}>
        <Button
          onClick={(event) => {
            this.props.dispatch(duplicateCirculation(this.props.id));
            event.stopPropagation();
          }}
          variant="outline-dark" size="sm"
          className="mr-1 py-0 btn-xs" >
          <Files />
        </Button>
        <Button
          onClick={(event) => {
            this.props.dispatch(deleteCirculation(this.props.id));
            event.stopPropagation();
          }}
          variant="outline-dark" size="sm"
          className="py-0 btn-xs" >
          <Trash />
        </Button>
      </div>
    );
  }

}

export default connect()(CirculationRowAction)