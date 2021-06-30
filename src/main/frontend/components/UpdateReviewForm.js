import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { jsonGet, jsonPut } from "../public/js/jsonFetch"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"
import StarRating from "./StarRating"

const UpdateReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    pizzaStyleId: "",
    title: "",
    comment: "",
    rating: "",
    imgUrl: ""
  })
  const [imageFile, setImageFile] = useState(null)
  const reviewId = props.match.params.id
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchReview = async () => {
    const respBody = await jsonGet(`/api/v1/reviews/${reviewId}`)
    const { pizzaStyleId, title, comment, rating, imgUrl } = respBody.review
    setFormPayload({
      ...formPayload,
      pizzaStyleId: pizzaStyleId.toString(),
      title,
      comment,
      rating: rating.toString(),
      imgUrl
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

  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleRatingChange = rating => {
    setFormPayload({
      ...formPayload,
      rating: rating
    })
  }

  const handleImageUpload = event => {
    console.log("in the upload")
    let file_size = event.target.files[0].size
    if (file_size > 10485760) {
      setErrors({
        ...errors,
        "The image":
          "file size: " + file_size + " bytes,  exceeds the size limit: " + 10485760 + " bytes."
      })
      setImageFile(null)
    } else {
      let lessSizeErrors = errors
      delete lessSizeErrors["The image"]
      setErrors(lessSizeErrors)
      setImageFile(event.currentTarget.files[0])
    }
  }

  const updateReviewWithImage = async () => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("formPayLoad", JSON.stringify(formPayload))
    console.log(formData)
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}/file`, {
        method: "put",
        body: formData
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else if (response.ok) {
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleUpdate = event => {
    event.preventDefault()
    console.log(formPayload)
    if (validForSubmission()) {
      if (imageFile !== null) {
        updateReviewWithImage()
      } else {
        updateReview()
      }
    }
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

      <StarRating formRating={formPayload.rating} handleRatingChange={handleRatingChange} />

      <div>
        <label htmlFor="imgFile">Image URL: </label>
        <input
          name="imgFile"
          id="imgFile"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default UpdateReviewForm
