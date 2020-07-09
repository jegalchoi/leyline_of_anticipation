import React, { Component } from 'react'
import { Consumer } from '../context'
import { CardsContainer } from './CardsContainer'
import { ButtonContainer } from './ButtonContainer'
import { SetsContainer } from './SetsContainer'
import { Stats } from './Stats'

export const App = () => {
  return (
    <Consumer>
      {(context) => (
        <div className='container'>
          <SetsContainer />

          <div className='container border rounded border-info'>
            <div className='container text-center display-6 m-3'>
              <p>
                Use the bottons to set the opponent's available mana.
                Possible cards will be shown accordingly.
              </p>
              <small className='text-muted text-center'>
                All possible instant-speed tricks are shown by
                default.
              </small>
            </div>
            <div className='row bg-info'>
              {[
                'Colorless',
                'Black',
                'Blue',
                'Green',
                'Red',
                'White',
              ].map((color, idx) => (
                <ButtonContainer color={color} key={idx} />
              ))}
            </div>
          </div>

          <Stats />

          <button
            className='btn btn-outline-danger btn-lg btn-block my-5 text-uppercase font-weight-bold'
            onClick={context.actions.enableTextOnly}
          >
            {context.textButton}
          </button>

          <CardsContainer />
        </div>
      )}
    </Consumer>
  )
}
