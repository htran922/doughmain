import React from "react"

const ReviewTile = props => {
  const { title, imgUrl, rating, createdAt, comment } = props.review
  const ts = new Date(createdAt)
  const year = ts.getFullYear()
  const month = ts.getMonth() + 1
  const day = ts.getDate()

  return (
    <div>
      <h3>{title}</h3>
      <img src={imgUrl} width="300px" />
      <p>Rating: {rating}</p>
      <p>{comment}</p>
      <p>
        {month}/{day}/{year}
      </p>
    </div>
  )
}
export default ReviewTile
