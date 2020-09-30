import React from 'react'
import { connect } from 'react-redux'
import FanHeureDepartModal from './FanHeureDepartModal'
import FanNumMarcheModal from './FanNumMarcheModal';

class CirculationSpecificModals extends React.Component {

    render() {
        return (
            <>
                {this.props.fanHeureDepartShown ? <FanHeureDepartModal /> : <></>}
                {this.props.fanNumMarcheShown ? <FanNumMarcheModal /> : <></>}
            </>
        );
    }

}

const mapState = (state) => {
    return ({
        fanHeureDepartShown: state.main.fanHeureDepartModal.shown,
        fanNumMarcheShown: state.main.fanNumMarcheModal.shown,
    });
}

export default connect(mapState)(CirculationSpecificModals)