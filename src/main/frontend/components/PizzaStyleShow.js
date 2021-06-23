import React, { useEffect, useState } from "react"
import ReviewTile from "./ReviewTile"
import PizzaStyleTile from "./PizzaStyleTile"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
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
  }, [])

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return <ReviewTile key={review.id} review={review} />
  })

  return (
    <div>
      <PizzaStyleTile key={pizzaStyle.id} pizzaStyle={pizzaStyle} />
      {reviewTiles}
    </div>
  )
}
export default PizzaStyleShow
