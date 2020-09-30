import React from 'react'
import { connect } from 'react-redux'

import { editedObject } from '../../app/enum'
import CirculationsSpecificToolbar from '../../circulationsComponents/toolbar/CirculationsSpecificToolbar'

class ObjectSpecificToolbar extends React.Component {

    render() {
        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                return (<CirculationsSpecificToolbar />);
            case editedObject.NONE:
            default:
                return (<></>);
        }
    }

}

const mapState = (state) => {
    return { editedObject: state.editedObject }
}

export default connect(mapState)(ObjectSpecificToolbar)