import React, { useEffect, useState } from "react"

const ReviewTile = props => {
  const { id, title, imgUrl, rating, createdAt, comment, upvoteCount } = props.review
  const [voteCount, setVoteCount] = useState(upvoteCount)
  const [disabledStatus, setDisabledStatus] = useState(false)
  const ts = new Date(createdAt)
  const year = ts.getFullYear()
  const month = ts.getMonth() + 1
  const day = ts.getDate()

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
    <div>
      <h3>{title}</h3>
      <img src={imgUrl} width="300px" />
      <p>Rating: {rating}</p>
      <p>{comment}</p>
      <p>
        {month}/{day}/{year}
      </p>
      <div>
        <span>Was this review helpful to you?</span>
        <button type="button" id="upvote-icon" disabled={disabledStatus} onClick={handleUpvoteClick}>
          <i className="fas fa-thumbs-up fa-2x"></i>
        </button>
        <span>{voteCount}</span>
      </div>
    </div>
  )
}

export default ReviewTile
