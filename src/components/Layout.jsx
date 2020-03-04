import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import App from './App'
import { Footer } from "./Footer"
import { Header } from "./Header"

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Header />
        </Jumbotron>
        <App />
        <Footer />
      </div>
    )
  }
}
