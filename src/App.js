import React from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Toolbar from './mainComponents/toolbar/Toolbar'
import MainTable from './mainComponents/table/MainTable'
import Modals from './mainComponents/modals/Modals';

const App = () => (
  <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Toolbar />
    <MainTable />
    <Modals />
  </Container>
);

export default App;
