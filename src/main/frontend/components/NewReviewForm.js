import React, { useEffect, useState } from "react"
import { Redirect } from "react-router"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"
import StarRating from "./StarRating"


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

  const addReviewWithImage = async () => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("formPayLoad", JSON.stringify(formPayload))
    try{
      const response = await fetch("/api/v1/reviews/file", {
        method: 'post',
        body: formData
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else { //Non 422
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else if(response.ok){
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

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      if(!!imageFile)
        addReviewWithImage();
      else
        addReview();
    }
  }

  const handleImageUpload = event => {
    //event.preventDefault()
    let file_size = event.target.files[0].size;
    if(file_size > 10485760){
      setErrors({
        ...errors,
        "The image" : "file size: " + file_size +
            " bytes,  exceeds the size limit: " + 10485760 + " bytes."
      });
      //Clear the state for the uncontrolled component.
      setImageFile(null);
    } else {
      //Clear error
     let lessSizeErrors = errors;
      delete lessSizeErrors["The image"];
      setErrors(lessSizeErrors);
      //Set the state for the uncontrolled component
      setImageFile(event.currentTarget.files[0])
    }
  }

  const addReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayload)
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
      }
      const body = await response.json()
      setStyleId(body.review.pizzaStyle.id)
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect push to={`/pizza-styles/${styleId}`} />
  }

  return (
    <form className="callout" onSubmit={handleSubmit}>
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

export default NewReviewForm
