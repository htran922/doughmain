import React from "react"

const ReviewTile = props => {
  const { title, imgUrl, rating, createdAt } = props.review
  const ts = new Date(createdAt)
  const year = ts.getFullYear()
  const month = ts.getMonth() + 1
  const day = ts.getDate()

  return (
    <div>
      <img src={imgUrl} width="300px" />
      <h1>{title}</h1>
      <p>Rating: {rating}</p>
      <p>
        Created At: {month}/{day}/{year}{" "}
      </p>
    </div>
  )
}
export default ReviewTile
