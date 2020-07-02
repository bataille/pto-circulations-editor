import React from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Toolbar from './components/Toolbar'
import CirculationsTable from './containers/CirculationsTable';
import Modals from './containers/modals/Modals';

const App = () => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Toolbar />
    <CirculationsTable />
    <Modals />
  </Container>
);

export default App;
