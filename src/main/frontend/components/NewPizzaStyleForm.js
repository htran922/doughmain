import React, { useState } from "react"
import { Redirect } from "react-router"
import _ from 'lodash'

import ErrorList from "./ErrorList"

const NewPizzaStyleForm = props => {
  const [formPayload, setFormPayload] = useState({
    name: "",
    imgUrl: ""
  })
  const [errors, setErrors] = useState({})
  const [styleId, setStyleId] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addStyle = async() => {
    try {
      const response = await fetch(`/api/v1/pizza-styles`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formPayload)
      })
      console.log(response);
      if(!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }
      const body = await response.json()
      setStyleId(body.pizzaStyle.id)
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["name"]
    requiredFields.forEach(field => {
      if(formPayload[field].trim() === "") {
        errors[field] = "is blank"
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(validForSubmission()) {
      addStyle()
    }
  }

  const handleInputChange = event => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  if (shouldRedirect) {
    return <Redirect push to={`/pizza-styles/${styleId}`} />
  }

  return (
    <form className="callout" onSubmit={handleSubmit}>
      <h2>Add A New Pizza Style</h2>
      <ErrorList errors={errors} />
      <div>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          id="name"
          type="text"
          value={formPayload.name}
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

export default NewPizzaStyleForm