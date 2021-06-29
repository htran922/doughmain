import React, { useEffect, useState } from "react"

const ReviewTile = props => {
  const { id, title, imgUrl, rating, createdAt, comment, upvoteCount } = props.review
  const [voteCount, setVoteCount] = useState(upvoteCount)
  const [disabledStatus, setDisabledStatus] = useState(false)
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
  
  const updateReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}/upvote`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(voteCount)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }

    } catch (err) {
      console.error(`Error in fetch: ${err.status} (${err.message})`);
    }
  }

  const handleUpvoteClick = event => {
    setVoteCount(voteCount + 1)
    setDisabledStatus(true)
  }

  useEffect(() => {
    updateReview()
  }, [voteCount])

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
      <div>
        <span>Was this review helpful to you?</span>
        <button type="button" disabled={disabledStatus} onClick={handleUpvoteClick}>
          <i className="fas fa-thumbs-up fa-2x"></i>
        </button>
        <span>{voteCount}</span>
      </div>
    </div>
  </div>
  )
}

export default ReviewTile
