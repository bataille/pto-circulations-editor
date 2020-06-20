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
        default:
            return state
    }
}

export default toolbar