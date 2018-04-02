export function createStore(reducer, enhancer) {
  if(enhancer) {
    return enhancer(createStore, reducer)
  }
  let currentState = {};
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v());
    return currentState;
  }

  dispatch({type: '@@@test/123'})
  return {
    getState,
    subscribe,
    dispatch
  }
}


export function applyMiddleware(...middlewares) {
  return (createStore, ...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    console.log(middlewareChain)
    dispatch = compose(...middlewareChain)(store.dispatch);
    // dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function compose(...funcs) {
    if(funcs.length === 0) {
      return args => args
    } else if(funcs.length === 1) {
      return funcs[0]
    }else {
      return  funcs.reduce((ret, item )=> (...args) => ret(item(...args)))
    }
};
// mapDispatchToProps方法
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
  // const bound = {};
  // Object.keys(creators).forEach(i => {
  //   bound[i] = bindActionCreator(creators[i], dispatch)
  // })
  // return bound;
}