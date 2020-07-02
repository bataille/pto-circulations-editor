import React from 'react'
import { connect } from 'react-redux'
import FanHeureDepartModal from './FanHeureDepartModal'
import FanNumMarcheModal from './FanNumMarcheModal';
import ShiftDateModal from './ShiftDateModal';

class Modals extends React.Component {

    render() {
        return (
            <>
                {this.props.fanHeureDepartShown ? <FanHeureDepartModal /> : <></>}
                {this.props.fanNumMarcheShown ? <FanNumMarcheModal /> : <></>}
                {this.props.shiftDateShown ? <ShiftDateModal /> : <></>}
            </>
        );
    }

}

const mapState = (state) => {
    return ({
        fanHeureDepartShown: state.toolbar.fanHeureDepartModal.shown,
        fanNumMarcheShown: state.toolbar.fanNumMarcheModal.shown,
        shiftDateShown: state.toolbar.shiftDateModal.shown
    });
}

export default connect(mapState)(Modals)