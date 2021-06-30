import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import _ from "lodash"
import { getData, jsonDelete } from "../public/js/jsonFetch"
import ReviewTile from "./ReviewTile"
import ReviewSortField from "./ReviewSortField"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  const [sortOption, setSortOption] = useState("")
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    try {
      const pizzaStyleData = await getData(`/api/v1/pizza-styles/${props.match.params.id}`)
      setPizzaStyle(pizzaStyleData.pizzaStyle)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const fetchPizzaStyleSort = async () => {
    if (sortOption !== "") {
      const sortOptionObject = JSON.parse(sortOption)
      const pizzaStyleData = await getData(
        `/api/v1/pizza-styles/${props.match.params.id}/${sortOptionObject.field}/${sortOptionObject.order}`
      )
      setPizzaStyle(pizzaStyleData.pizzaStyle)
    }
  }

  useEffect(() => {
    fetchPizzaStyle()
  }, [location.pathname])

  useEffect(() => {
    fetchPizzaStyleSort()
  }, [sortOption])

  const deleteReview = async url => {
    await jsonDelete(url, fetchPizzaStyle)
  }

  const handleDelete = event => {
    let id = event.target.value
    deleteReview(`/api/v1/reviews/${id}`)
  }

  const handleSortSelect = event => {
    const selected = event.target.value
    setSortOption(selected)
  }

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return (
      <div key={review.id} className="callout">
        <ReviewTile review={review} />
        <div className="small button-group">
          <Link to={`/reviews/${review.id}/edit`}>
            <button type="button" className="success button">
              Edit
            </button>
          </Link>
          <button type="button" value={review.id} onClick={handleDelete} className="alert button">
            Delete
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="grid-container">
      <div>
        <div className="show-page" style={{ backgroundImage: `url(${pizzaStyle.imgUrl})` }}>
          <h1>{pizzaStyle.name}</h1>
        </div>
        {/* <div>
          <Link to="/reviews/new" className="button" type="button">
            Add A Review
          </Link>
        </div> */}
      </div>
      <span className="inline">{pizzaStyle.description}</span>

      <div className="review-title">
        <h2>Reviews</h2>
        <ReviewSortField sortOption={sortOption} handleSortSelect={handleSortSelect} />
      </div>

      {reviewTiles}
    </div>
  )
}

export default PizzaStyleShow
