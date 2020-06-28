import { produce } from 'immer'

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
            return produce(state, draftState => { draftState.fanHeureDepartModal.shown = true; });
        case 'FAN_HEURE_DEPART_VALIDATED':
        case 'FAN_HEURE_DEPART_CLOSED':
            return produce(state, draftState => { draftState.fanHeureDepartModal.shown = false; });
        case 'FAN_NUM_MARCHE_BUTTON_CLICKED':
            return produce(state, draftState => { draftState.fanNumMarcheModal.shown = true; });
        case 'FAN_NUM_MARCHE_VALIDATED':
        case 'FAN_NUM_MARCHE_CLOSED':
            return produce(state, draftState => { draftState.fanNumMarcheModal.shown = false; });
        default:
            return state
    }
}

export default toolbar