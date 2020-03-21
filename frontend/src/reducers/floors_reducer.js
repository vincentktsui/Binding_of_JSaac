import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";

const floorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.payload.floors;

        case REMOVE_LOBBY:
            return {};

        default:
            return state;
  }
};

export default floorsReducer;
