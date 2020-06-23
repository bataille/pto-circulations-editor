let defaultState = {
    loadingInfo: {
        isLoading: false,
        toLoadCount: 0,
        loadedCount: 0
    },
    shiftDateModal: {
        shown: false,
    },
    fanHeureDepartModal: {
        shown: false,
    },
    fanNumMarcheModal: {
        shown: false,
    }
}

const toolbar = (state = defaultState, action) => {
    switch (action.type) {
        case 'FAN_HEURE_DEPART_BUTTON_CLICKED':
            return ({
                ...state,
                fanHeureDepartModal: {
                    ...state.fanHeureDepartModal,
                    shown: true
                }
            })
        case 'FAN_HEURE_DEPART_VALIDATED':
        case 'FAN_HEURE_DEPART_CLOSED':
            return ({
                ...state,
                fanHeureDepartModal: {
                    shown: false
                }
            })
            case 'FAN_NUM_MARCHE_BUTTON_CLICKED':
                return ({
                    ...state,
                    fanNumMarcheModal: {
                        ...state.fanNumMarcheModal,
                        shown: true
                    }
                })
            case 'FAN_NUM_MARCHE_VALIDATED':
            case 'FAN_NUM_MARCHE_CLOSED':
                return ({
                    ...state,
                    fanNumMarcheModal: {
                        shown: false
                    }
                })
        default:
            return state
    }
}

export default toolbar