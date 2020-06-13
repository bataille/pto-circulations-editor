import React from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import CirculationsListToolbar from './components/CirculationsListToolbar'
import CirculationsListContainer from './containers/CirculationsListContainer';

const App = () => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <CirculationsListToolbar />
    <CirculationsListContainer />
  </Container>
);

export default App;
