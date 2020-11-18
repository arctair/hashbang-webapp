import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import NamedTagLists from './NamedTagLists'
import NamedTagList from './NamedTagList'
import NewNamedTagList from './NewNamedTagList'
import * as serviceWorker from './serviceWorker'
import { Provider } from './hashbang'
import context from './context'

ReactDOM.render(
  <Provider context={context}>
    <NamedTagLists Component={NamedTagList} />
    <NewNamedTagList />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

export { context }
