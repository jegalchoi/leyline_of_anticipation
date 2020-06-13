import React from 'react'
import { Consumer } from '../context'
import PropTypes from 'prop-types'

export const Card = ({ card }) => {
  return (
    <Consumer>
      {({ selectedSet, textOnly }) => {
        return (
          <div className='col-12 col-lg-3 col-md-3 mx-auto my-3'>
            <div className='card ml-4'>
              <div className='container p-1'>
                {textOnly ? (
                  <div>
                    <h5>
                      {card.name} {card.manaCost}
                    </h5>
                    <h5 className='text-muted'>{card.type}</h5>
                    <p>{card.text}</p>
                  </div>
                ) : (
                  <img
                    className='card-img-top'
                    src={`https://res.cloudinary.com/diekjezbk/image/upload/${selectedSet}/${selectedSet}-${card.number}.jpg`}
                    alt={card.name}
                  />
                )}
              </div>
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
}
