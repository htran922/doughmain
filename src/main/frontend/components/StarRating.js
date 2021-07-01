import React, { useState, useEffect } from "react"
import Star from "./Star"

const StarRating = ({ formRating, handleRatingChange }) => {
  const [rating, setRating] = useState(parseInt(formRating) || 0)
  const [selection, setSelection] = useState(0)

  const hoverOver = event => {
    let val = 0
    if (event && event.target && event.target.getAttribute("data-star-id")) {
      val = event.target.getAttribute("data-star-id")
      setSelection(val)
    }
  }

  const handleClick = event => {
    setRating(event.target.getAttribute("data-star-id") || rating)
  }

  useEffect(() => {
    handleRatingChange(rating.toString())
  }, [rating])

  const starComponents = Array.from({ length: 5 }, (v, i) => (
    <Star
      starId={i + 1}
      key={`star_${i + 1}`}
      marked={selection ? selection >= i + 1 : rating >= i + 1}
      value={i + 1}
    />
  ))

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={handleClick}
      onMouseOver={hoverOver}
      value={formRating}
      name="rating"
      id="rating"
    >
      <label htmlFor="rating">Rating </label>
      {starComponents}
    </div>
  )
}

export default StarRating
