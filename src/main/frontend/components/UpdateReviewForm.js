import React, { useEffect, useState } from "react"
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

  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchReview = async () => {
    const respBody = await jsonGet(`/api/v1/reviews/${props.match.params.id}`)
    const { pizzaStyleId, title, comment, rating, imgUrl } = respBody.review
    setFormPayload({
      ...formPayload, 
      pizzaStyleId, 
      title, 
      comment, 
      rating, 
      imgUrl
    })
  }

  useEffect(() => {
    fetchReview()
  }, [])

  const updateReview = async () => {
    await jsonPut(`/api/v1/reviews/${formPayload.id}`, formPayload, setFormPayload)
    setShouldRedirect(true)
  }
  
  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["title", "rating", "pizzaStyleId"]
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
    if (validForSubmission()) {
      updateReview()
    }
  }

  if (shouldRedirect) {
    return <Redirect push to={`/pizza-styles/${pizzaStyleId}`} />
  }

  return (
    <form className="callout" onSubmit={handleUpdate}>
      <h2>Add A Review</h2>
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
          min="0"
          max="5"
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
