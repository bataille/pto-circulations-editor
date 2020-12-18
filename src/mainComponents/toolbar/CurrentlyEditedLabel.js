import React from 'react'
import { connect } from 'react-redux'

import Badge from 'react-bootstrap/Badge'
import { editedObject } from '../../app/enums/editedObject'

class CurrentlyEditedLabel extends React.Component {

    render() {
        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                return (<Badge variant="primary" {...this.props}>Circulations</Badge>);
            case editedObject.PTX:
                return (<Badge variant="warning" {...this.props}>PTX</Badge>);
            case editedObject.NONE:
            default:
                return (<></>);
        }
    }

}

const mapState = (state) => {
    return { editedObject: state.editedObject }
}

export default connect(mapState)(CurrentlyEditedLabel)