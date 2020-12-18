import React from 'react'
import { connect } from 'react-redux'

import { editedObject } from '../../app/enums/editedObject'
import ShiftDateModal from './ShiftDateModal';
import CirculationsSpecificModals from '../../circulationsComponents/modals/CirculationsSpecificModals'

function ObjectSpecificModals(props) {
    switch (props.editedObject) {
        case editedObject.CIRCULATIONS:
            return (<CirculationsSpecificModals />);
        default:
            return (<></>);
    }
}

class Modals extends React.Component {

    render() {
        return (
            <>
                {this.props.shiftDateShown ? <ShiftDateModal /> : <></>}
                <ObjectSpecificModals {...this.props} />
            </>
        );
    }

}

const mapState = (state) => {
    return ({
        editedObject: state.editedObject,
        shiftDateShown: state.main.shiftDateModal.shown
    });
}

export default connect(mapState)(Modals)