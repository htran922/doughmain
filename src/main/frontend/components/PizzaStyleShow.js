import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ReviewTile from "./ReviewTile"
import PizzaStyleTile from "./PizzaStyleTile"
import { jsonGet, jsonDelete } from "../public/js/jsonFetch"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    const respBody = await jsonGet(`/api/v1/pizza-styles/${props.match.params.id}`)
    setPizzaStyle(respBody.pizzaStyle)
  }

  useEffect(() => {
    fetchPizzaStyle()
  }, [location.pathname])

  const deleteReview = async url => {
    await jsonDelete(url, fetchPizzaStyle)
  }

  const onClick = event => {
    if (event.target.value.includes("delete")) {
      let id = event.target.value.split(":")[1]
      deleteReview(`/api/v1/reviews/${id}`)
    } else if (event.target.value.includes("edit")) {
      let id = event.target.value.split(":")[1]
      /***** TODO: Hit endPoint to redirect to prepopluated form ***
       * Then use jsonPut or add an UPDATE method
       */
    }
  }

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return (
      <div key={review.id}>
        <ReviewTile review={review} />
        <div className="small button-group">
          <button
            type="button"
            value={`edit:${review.id}`}
            onClick={onClick}
            className="success button"
          >
            Edit
          </button>
          <button
            type="button"
            value={`delete:${review.id}`}
            onClick={onClick}
            className="alert button"
          >
            Delete
          </button>
        </div>
      </div>
    )
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

      <br />
      {reviewTiles}
    </div>
  )
}
export default PizzaStyleShow
