import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { getData, jsonPut } from "../public/js/jsonFetch"
import ReviewForm from "./ReviewForm"

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
  const [imageFile, setImageFile] = useState(null)
  const [imageFileSize, setImageFileSize] = useState(null)

  const fetchReview = async () => {
    const respBody = await getData(`/api/v1/reviews/${reviewId}`)
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
    const requiredFields = ["title", "rating", "pizzaStyleId"]
    requiredFields.forEach(field => {
      if (formPayload[field].trim() === "") {
        errors[field] = "can not be blank"
      }
    })

    if (imageFileSize !== null && imageFileSize > 10485760) {
      errors["Image File"] = "must be less than 1 MB"
    }

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
    const file = event.currentTarget.files[0]
    if (file) {
      setImageFileSize(file.size)
      setImageFile(file)
    } else {
      setImageFileSize(null)
      setImageFile(null)
    }
  }

  const updateReviewWithImage = async () => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("formPayload", JSON.stringify(formPayload))
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
    <ReviewForm
      formTitle="Update a Review"
      handleSubmit={handleUpdate}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleRatingChange={handleRatingChange}
      formPayload={formPayload}
      errors={errors}
    />
  )
}

export default UpdateReviewForm
