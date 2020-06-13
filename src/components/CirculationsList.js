import React from 'react';
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table';
import CirculationRow from '../containers/CirculationRow';

const CirculationsList = ({ circulations }) => (
    <Table hover>
        <thead>
            <tr>
                <th></th>
                <th>Num. Marche</th>
                <th>Code TCT</th>
                <th>Jour de départ</th>
                <th>Heure de départ</th>
                <th>Départ</th>
                <th>Arrivée</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {circulations.map(circulation => (
                <CirculationRow  key={circulation.id}
                id={circulation.id}
                numMarche={circulation.numMarche}
                codeTCT={circulation.codeTCT}
                heureDepart={circulation.heureDepart}
                depart={circulation.depart}
                arrivee={circulation.arrivee}
                selected={circulation.selected} />
            ))}
        </tbody>
    </Table >
)

CirculationsList.propTypes = {
    circulations: PropTypes.arrayOf(
      PropTypes.shape({
        codeTCT: PropTypes.string.isRequired,
        heureDepart: PropTypes.string.isRequired,
        depart: PropTypes.string.isRequired,
        arrivee: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }

export default CirculationsList;