
export function reduce(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return 10;
  }
}

export function add() {
  return {type: 'add'}
}
export function minus() {
  return {type: 'minus'}
}
export function addTwice() {
  return [{type: 'add'},{type: 'add'}]
}
export function timeout() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}