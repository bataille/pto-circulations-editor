import React from 'react'
import { connect } from 'react-redux'

import { editedObject } from '../../app/enums/editedObject'
import CirculationsSpecificToolbar from '../../circulationsComponents/toolbar/CirculationsSpecificToolbar'
import EnchainementsSpecificToolbar from '../../enchainementsComponents/toolbar/EnchainementsSpecificToolbar'

class ObjectSpecificToolbar extends React.Component {

    render() {
        switch (this.props.editedObject) {
            case editedObject.CIRCULATIONS:
                return (<CirculationsSpecificToolbar />);
            case editedObject.ENCHAINEMENTS:
                return (<EnchainementsSpecificToolbar />);
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