import React from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import CirculationsListToolbar from './components/CirculationsListToolbar'
import CirculationsList from './containers/CirculationsList';

const App = () => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <CirculationsListToolbar />
    <CirculationsList />
  </Container>
);

export default App;
