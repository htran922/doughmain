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
      <h1>See All Pizza Styles</h1>
      <div className="grid-x grid-margin-x small-up-2 medium-up-3">{pizzaStyleTiles}</div>
    </div>
  )
}

export default PizzaStylesIndex
