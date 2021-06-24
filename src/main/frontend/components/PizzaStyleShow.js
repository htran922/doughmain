import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import _ from "lodash"
import ReviewTile from "./ReviewTile"
import { jsonGet, jsonDelete } from "../public/js/jsonFetch"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  const [errors, setErrors] = useState("")
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    try {
      const response = await fetch(`/api/v1/pizza-styles/${props.match.params.id}`)
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          console.log(body)
          setPizzaStyle({})
          return setErrors(body.message)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
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

  if (_.isEmpty(pizzaStyle)) {
    return <h2 className="text-center">{errors}</h2>
  }

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
