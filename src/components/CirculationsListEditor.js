import React from 'react';

import CirculationsListToolbar from './CirculationsListToolbar'
import CirculationsListContainer from '../containers/CirculationsListContainer';

class CirculationsListEditor extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '1em' }}>
                <CirculationsListToolbar />
                <CirculationsListContainer />
            </div>);
    }
}

export default CirculationsListEditor;