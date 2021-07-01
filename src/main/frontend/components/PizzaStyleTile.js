import React from "react"

const PizzaStyleTile = props => {
  const { id, name, imgUrl } = props.pizzaStyle

  return (
    <div className="cell">
      <div className="card">
        <div className="card-image text-center">
          <img src={imgUrl} />
        </div>
        <div className="card-section">
          <a href={`/pizza-styles/${id}`}>
            <h4>{name}</h4>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PizzaStyleTile
