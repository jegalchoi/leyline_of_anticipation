import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context'
import 'bootstrap/dist/css/bootstrap.css'

import { Layout } from './components/Layout'

ReactDOM.render(
  <Provider>
    <Layout />
  </Provider>,
  document.getElementById('root')
)
