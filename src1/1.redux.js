import {
  createStore
} from './test.redux';

function reduce(state, action) {
  console.log(action);
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return 10;
  }
}

const store = createStore(reduce);

const val = store.getState();
console.log(val)

store.subscribe(() => {
  console.log(`store = ${store.getState()}`)
})

store.dispatch({type: 'add'})
store.dispatch({type: 'add'})
store.dispatch({type: 'add'})
store.dispatch({type: 'minus'})