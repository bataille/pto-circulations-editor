const circulationsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CIRCULATION':
      return ({
        ...state,
        circulations: [
          ...state.circulations, {
            id: action.id,
            xml: action.xml
          }
        ]
      });
    case 'CHANGE_CIRCULATION_XML':
      return ({
        ...state,
        circulations: state.circulations.map((circulation) => {
          return (circulation.id === action.id) ? {...circulation, xml: action.xml} : circulation
        })
      });
    default:
      return state
  }
}

export default circulationsReducer