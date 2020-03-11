import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import { App } from './App'
import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = () => {
  return (
    <React.Fragment>
      <Jumbotron>
        <Header />
      </Jumbotron>
      <App />
      <Footer />
    </React.Fragment>
  )
}

