import React from "react"

const PizzaStyleTile = props => {
  const { id, name, imgUrl } = props.pizzaStyle 

  return (
    <div>
      <img src={imgUrl} width="300px" />
      <a href={`/pizza-styles/${id}`}>
        <h1>{name}</h1>
      </a>
    </div>
  )
}

export default PizzaStyleTile