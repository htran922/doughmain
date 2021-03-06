import React, { useEffect, useState } from "react"

const ReviewTile = props => {
  const { id, title, imgUrl, rating, createdAt, comment, upvoteCount } = props.review
  const [voteCount, setVoteCount] = useState(upvoteCount)
  const [disabledStatus, setDisabledStatus] = useState(false)
  const ts = new Date(createdAt)
  const year = ts.getFullYear()
  const month = ts.getMonth() + 1
  const day = ts.getDate()

  let one = "far"
  let two = "far"
  let three = "far"
  let four = "far"
  let five = "far"

  if (rating == 1) {
    one = "fas"
  } else if (rating == 2) {
    one = "fas"
    two = "fas"
  } else if (rating == 3) {
    one = "fas"
    two = "fas"
    three = "fas"
  } else if (rating == 4) {
    one = "fas"
    two = "fas"
    three = "fas"
    four = "fas"
  } else if (rating == 5) {
    one = "fas"
    two = "fas"
    three = "fas"
    four = "fas"
    five = "fas"
  }

  const stars = [
    <i key="1" className={`${one} fa-star`}></i>,
    <i key="2" className={`${two} fa-star`}></i>,
    <i key="3" className={`${three} fa-star`}></i>,
    <i key="4" className={`${four} fa-star`}></i>,
    <i key="5" className={`${five} fa-star`}></i>
  ]

  const updateReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}/upvote`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(voteCount)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.status} (${err.message})`)
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
    <div className="review-container media-object">
      <div className="review-section">
        <section>
          <h3>{title}</h3>
          <i className="stars">{stars}</i>

          <span>
            {month}/{day}/{year}
          </span>
          <p>{comment}</p>
        </section>

        <div>
          <span>Was this review helpful to you? </span>
          <button type="button" disabled={disabledStatus} onClick={handleUpvoteClick}>
            <i className="fas fa-thumbs-up"></i>
          </button>
          <span> {voteCount}</span>
        </div>
      </div>

      <div className="review-image">
        <img src={imgUrl} />
      </div>
    </div>
  )
}

export default ReviewTile
