import React from "react"

const PizzaStyleTile = props => {
  const { id, name, imgUrl } = props.pizzaStyle

  return (
    <div className="cell">
      <div className="card">
        <a href={`/pizza-styles/${id}`}>
          <div className="card-image text-center">
            <img src={imgUrl} />
          </div>
          <div className="card-section">
            <h4>{name}</h4>
          </div>
        </a>
      </div>
    </div>
  )
}

export default PizzaStyleTile
