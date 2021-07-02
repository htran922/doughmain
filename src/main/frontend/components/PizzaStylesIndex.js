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
    <div>
      <h1 className="landing-image">Discover the best pizza styles for you</h1>
      <div className="landing">
        <h2 className="text-center">For pizza lovers, by pizza lovers.</h2>

        <div className="text-center icons">
          <section>
            <i className="fas fa-pizza-slice"></i>
            <p className="icon-label">Find Pizza</p>
          </section>
          <section>
            <i className="fas fa-book"></i>
            <p className="icon-label">Read Reviews</p>
          </section>
          <section>
            <i className="fas fa-edit"></i>
            <p className="icon-label">Leave a Review</p>
          </section>
        </div>
      </div>

      <div className="grid-container">
        <h2 className="header">Pizza Styles</h2>
        <h4 className="header">
          <em>
            Explore different pizza styles and see what others are saying about your favorite pizzas
          </em>
        </h4>
        <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
          {pizzaStyleTiles}
        </div>
      </div>
    </div>
  )
}

export default PizzaStylesIndex
