import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ReviewTile from "./ReviewTile"
import PizzaStyleTile from "./PizzaStyleTile"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    try {
      const response = await fetch(`/api/v1/pizza-styles/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const pizzaStyleData = await response.json()
      setPizzaStyle(pizzaStyleData.pizzaStyle)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyle()
  }, [location.pathname])

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return <ReviewTile key={review.id} review={review} />
  })

  return (
    <div>
      <div className="text-center">
        <h1>{pizzaStyle.name}</h1>
        <img src={pizzaStyle.imgUrl} />
        <div>
          <Link to="/reviews/new" className="button" type="button">
            Add A Review
          </Link>
        </div>
      </div>

      <hr />
      {reviewTiles}
    </div>
  )
}
export default PizzaStyleShow
