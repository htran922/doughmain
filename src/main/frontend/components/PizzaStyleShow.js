import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import _ from "lodash"
import { jsonGet, jsonDelete } from "../public/js/jsonFetch"
import ReviewTile from "./ReviewTile"
import ReviewSortField from "./ReviewSortField"

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({ reviews: [] })
  const [errors, setErrors] = useState("")
  const [sortOption, setSortOption] = useState("")
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

  const fetchPizzaStyleSort = async () => {
    if (sortOption !== "") {
      const sortOptionObject = JSON.parse(sortOption)
      const pizzaStyleData = await jsonGet(
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

  if (_.isEmpty(pizzaStyle)) {
    return <h2 className="text-center">{errors}</h2>
  }

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
        <div className="show-page" 
        // style={{ backgroundImage: `url(${pizzaStyle.imgUrl})`}}
        >
          {/* <img src={pizzaStyle.imgUrl} /> */}
          <h1>{pizzaStyle.name}</h1>
        </div>
        {/* <div>
          <Link to="/reviews/new" className="button" type="button">
            Add A Review
          </Link>
        </div> */}
      </div>
      <span className="inline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sollicitudin lacus. Proin imperdiet augue in metus auctor, tincidunt dictum felis pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam a placerat nibh. Sed non faucibus orci. Morbi maximus sit amet urna non blandit.</span>

      <div className="review-title">
        <h2>Reviews</h2>
      <ReviewSortField sortOption={sortOption} handleSortSelect={handleSortSelect} />
      </div>
      

      
      {reviewTiles}
    </div>
  )
}

export default PizzaStyleShow
