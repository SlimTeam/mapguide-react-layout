// A reducer to remember the last dispatched action
//
// As suggested by the creator of redux:
// https://github.com/reactjs/redux/issues/580

export function lastAction(state = null, action) {
    return action;
}