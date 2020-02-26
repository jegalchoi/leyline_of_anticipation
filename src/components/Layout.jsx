import React, { Component } from 'react'

import App from './App'
import { Footer } from "./Footer"
import { Header } from "./Header"

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <App />
        <Footer />
      </div>
    )
  }
}
