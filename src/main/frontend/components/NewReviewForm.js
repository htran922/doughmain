import React, { useState } from "react"
import { Redirect } from "react-router"
import ReviewForm from "./ReviewForm"
import { postData } from "../public/js/jsonFetch"

const NewReviewForm = props => {
  const [formPayload, setFormPayload] = useState({
    pizzaStyleId: "",
    title: "",
    comment: "",
    rating: "",
    imgUrl: ""
  })
  const [errors, setErrors] = useState({})
  const [styleId, setStyleId] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileSize, setImageFileSize] = useState(null)

  const addReview = async () => {
    try {
      const responseBody = await postData("/api/v1/reviews", formPayload, setErrors)
      setStyleId(responseBody.review.pizzaStyle.id)
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const addReviewWithImage = async () => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("formPayload", JSON.stringify(formPayload))
    try {
      const response = await fetch("/api/v1/reviews/file", {
        method: "post",
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
        console.log(response.data)
        console.log("File uploaded successfully")
        const body = await response.json()
        setStyleId(body.review.pizzaStyle.id)
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
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
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleRatingChange = rating => {
    setFormPayload({
      ...formPayload,
      rating: rating
    })
  }

  const handleImageUpload = acceptedFiles => {
    const file = acceptedFiles[0]
    if (file) {
      setImageFileSize(file.size)
      setImageFile(file)
    } else {
      setImageFileSize(null)
      setImageFile(null)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      if (imageFile !== null) {
        addReviewWithImage()
      } else {
        addReview()
      }
    }
  }

  if (shouldRedirect) {
    return <Redirect push to={`/pizza-styles/${styleId}`} />
  }

  return (
    <ReviewForm
      formTitle="Write A Review"
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleRatingChange={handleRatingChange}
      formPayload={formPayload}
      errors={errors}
    />
  )
}

export default NewReviewForm
