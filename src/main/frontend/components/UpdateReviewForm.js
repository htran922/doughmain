import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { jsonGet, jsonPut } from "../public/js/jsonFetch"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"

const UpdateReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    pizzaStyleId: "",
    title: "",
    comment: "",
    rating: "",
    imgUrl: ""
  })
  const reviewId = props.match.params.id
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchReview = async () => {
    const respBody = await jsonGet(`/api/v1/reviews/${reviewId}`)
    const { pizzaStyleId, title, comment, rating, imgUrl, createdAt } = respBody.review
    setFormPayload({
      ...formPayload,
      pizzaStyleId: pizzaStyleId.toString(),
      title,
      comment,
      rating: rating.toString(),
      imgUrl,
      createdAt
    })
  }

  useEffect(() => {
    fetchReview()
  }, [])

  const updateReview = async () => {
    await jsonPut(`/api/v1/reviews/${reviewId}`, formPayload, setErrors, setShouldRedirect)
  }

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["pizzaStyleId", "title", "rating"]
    requiredFields.forEach(field => {
      if (formPayload[field].trim() === "") {
        errors[field] = "can not be blank"
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const handleUpdate = event => {
    event.preventDefault()
    console.log(formPayload)
    if (validForSubmission()) {
      updateReview()
    }
  }

  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  if (shouldRedirect) {
    return <Redirect to={`/pizza-styles/${formPayload.pizzaStyleId}`} />
  }

  return (
    <form className="callout" onSubmit={handleUpdate}>
      <h2>Update Review</h2>
      <ErrorList errors={errors} />
      <PizzaStyleField
        handleInputChange={handleInputChange}
        pizzaStyleId={formPayload.pizzaStyleId}
      />
      <div>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          id="title"
          type="text"
          value={formPayload.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="comment">Comment: </label>
        <input
          name="comment"
          id="comment"
          type="text"
          value={formPayload.comment}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="rating">Rating: </label>
        <input
          name="rating"
          id="rating"
          type="number"
          // min="0"
          // max="5"
          step="1"
          value={formPayload.rating}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="imgUrl">Image URL: </label>
        <input
          name="imgUrl"
          id="imgUrl"
          type="text"
          value={formPayload.imgUrl}
          onChange={handleInputChange}
        />
      </div>

      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default UpdateReviewForm
