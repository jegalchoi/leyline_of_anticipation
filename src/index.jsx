import React from 'react'
import ReactDOM from 'react-dom'
import {MTGProvider} from './context'
import 'bootstrap/dist/css/bootstrap.css'

import Layout from './components/Layout'

ReactDOM.render(
  <MTGProvider>
    <Layout />
  </MTGProvider>,
  document.getElementById("root")
);