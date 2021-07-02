import React, { useEffect, useState } from "react"
import { Link, useLocation, Redirect } from "react-router-dom"
import _ from "lodash"
import { getData, jsonDelete } from "../public/js/jsonFetch"
import ReviewTile from "./ReviewTile"
import ReviewSortField from "./ReviewSortField"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  const [sortOption, setSortOption] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    const pizzaStyleData = await getData(
      `/api/v1/pizza-styles/${props.match.params.id}`,
      setShouldRedirect
    )
    setPizzaStyle(pizzaStyleData.pizzaStyle)
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

  if (shouldRedirect) {
    return <Redirect to={"/404"} />
  }

  let reviewTiles = pizzaStyle.reviews.map(review => {
    return (
      <div key={review.id} className="callout">
        <ReviewTile review={review} />
        <div className="small button-group">
          <Link to={`/reviews/${review.id}/edit`}>
            <button type="button" className="review-edit-btn button">
              Edit
            </button>
          </Link>
          <button type="button" value={review.id} onClick={handleDelete} className="review-delete-btn button">
            Delete
          </button>
        </div>
      </div>
    )
  })

  if (_.isEmpty(reviewTiles)) {
    reviewTiles = (
      <div className="inline">
        <em>There aren't any reviews here yet</em>
      </div>
    )
  }

  return (
    <div>
      <div className="show-page-image" style={{ backgroundImage: `url(${pizzaStyle.imgUrl})` }}>
        <h1>{pizzaStyle.name}</h1>
      </div>

      <span className="inline">{pizzaStyle.description}</span>

      <section className="grid-container">
        <div className="review-title">
          <h2>Reviews</h2>
          <ReviewSortField sortOption={sortOption} handleSortSelect={handleSortSelect} />
        </div>
        {reviewTiles}
      </section>
    </div>
  )
}

export default PizzaStyleShow
