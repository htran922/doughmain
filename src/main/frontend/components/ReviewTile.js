import React from "react"

const ReviewTile = props => {
  const { title, imgUrl, rating, createdAt, comment } = props.review
  const ts = new Date(createdAt)
  const year = ts.getFullYear()
  const month = ts.getMonth() + 1
  const day = ts.getDate()

  const stars = [
    <i className="fas fa-star"></i>, 
    <i className="fas fa-star"></i>, 
    <i className="fas fa-star"></i>, 
    <i className="fas fa-star"></i>, 
    <i className="far fa-star"></i>
  ]

  return (
    <div className="media-object">
      <div className={`stars-${rating}`}>
        <h3>{title}</h3>
        <i>{stars}</i>
        {/* <p >Rating: {rating}
        <i className="fas fa-star"></i>
        <i className="far fa-star"></i>
        </p> */}
        <p>{comment}</p>
      </div>

      <p>
        {month}/{day}/{year}
      </p>

      <div className="media-object-section">
        <img src={imgUrl} width="300px" />
      </div>
    </div>
  )
}
export default ReviewTile
