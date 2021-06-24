import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { jsonGet, jsonDelete } from "../public/js/jsonFetch"
import ReviewTile from "./ReviewTile"

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

  const handleDelete = event => {
    let id = event.target.value
    deleteReview(`/api/v1/reviews/${id}`)
  }

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return (
      <div key={review.id}>
        <ReviewTile review={review} />
        <div className="small button-group">
          <Link to={`/reviews/${review.id}/edit`}>
            <button type="button" className="success button">
              Edit
            </button>
          </Link>
          <button
            type="button"
            value={review.id}
            onClick={handleDelete}
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
