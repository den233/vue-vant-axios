import React from 'react';
import Counter from '../components/counter'
import counter from '../reducers/reducers'
import { createStore } from 'redux'
const store = createStore(counter)
export default class Home extends React.Component {
    render() {
        return (
          <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
        )
    }
}
// store.subscribe(render)