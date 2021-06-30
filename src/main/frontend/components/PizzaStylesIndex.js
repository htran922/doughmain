import React, { useEffect, useState } from "react"
import PizzaStyleTile from "./PizzaStyleTile"
import { getData } from "../public/js/jsonFetch"

const PizzaStylesIndex = props => {
  const [pizzaStyles, setPizzaStyles] = useState([])
  const fetchPizzaStyles = async () => {
    try {
      const pizzaStylesData = await getData("/api/v1/pizza-styles")
      setPizzaStyles(pizzaStylesData.pizzaStyles)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyles()
  }, [])

  const pizzaStyleTiles = pizzaStyles.map(style => {
    return <PizzaStyleTile key={style.id} pizzaStyle={style} />
  })

  return (
    <div className="grid-container">
      <h1 className="big-image">Discover the best pizza styles for you</h1>
      <h2 className="text-center header">For pizza lovers, by pizza lovers.</h2>

      <h1 className="text-center icons">
        <i className="fas fa-pizza-slice"></i>
        <i className="fas fa-pizza-slice"></i>
        <i className="fas fa-pizza-slice"></i>
      </h1>
      <h2 className="header">Pizza Styles</h2>
      <div className="grid-x grid-margin-x small-up-2 medium-up-3">{pizzaStyleTiles}</div>
    </div>
  )
}

export default PizzaStylesIndex
