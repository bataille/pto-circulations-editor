import React from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Toolbar from './components/Toolbar'
import CirculationsTable from './containers/CirculationsTable';

const App = () => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Toolbar />
    <CirculationsTable />
  </Container>
);

export default App;
