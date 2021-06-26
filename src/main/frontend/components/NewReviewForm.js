import React, { useEffect, useState } from "react"
import { Redirect } from "react-router"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"
import {jsonPost} from "../public/js/jsonFetch";

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
  const [imagefile, setImageFile] = useState(undefined)

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

  const addReview2 = async () => {
    const formData = new FormData();
    formData.append("file", imagefile);
    formData.append("formPayLoad", JSON.stringify(formPayload));
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
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw (error);
        }
      } else if(res.ok){
        console.log(res.data);
        console.log("File uploaded successfully");
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      addReview2()
    }
  }

  const onChange = event => {
    event.preventDefault();
    setImageFile(event.currentTarget.files[0]);
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

      <div>
        <label htmlFor="imgFile">Image URL: </label>
        <input
            name="imgFile"
            id="imgFile"
            type="file"
            onChange={onChange}
        />
      </div>


      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default NewReviewForm
