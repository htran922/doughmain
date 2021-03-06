import React, { useState } from "react"
import { Redirect } from "react-router"
import _ from "lodash"
import { postData } from "../public/js/jsonFetch"

import ErrorList from "./ErrorList"

const NewPizzaStyleForm = props => {
  const [formPayload, setFormPayload] = useState({
    name: "",
    imgUrl: "",
    description: ""
  })
  const [errors, setErrors] = useState({})
  const [styleId, setStyleId] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addStyle = async () => {
    try {
      const responseBody = await postData("/api/v1/pizza-styles", formPayload, setErrors)
      setStyleId(responseBody.pizzaStyle.id)
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const validForSubmission = () => {
    const errors = {}
    const requiredFields = ["name"]
    requiredFields.forEach(field => {
      if (formPayload[field].trim() === "") {
        errors[field] = "can not be blank"
      }
    })
    setErrors(errors)
    return _.isEmpty(errors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
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
    <form className="callout form" onSubmit={handleSubmit}>
      <h2>Add A Pizza Style</h2>
      <ErrorList errors={errors} />
      <div>
        <label htmlFor="name">Name </label>
        <input
          name="name"
          id="name"
          type="text"
          value={formPayload.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="imgUrl">Image URL </label>
        <input
          name="imgUrl"
          id="imgUrl"
          type="text"
          value={formPayload.imgUrl}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description </label>
        <textarea
          name="description"
          id="description"
          placeholder="Neapolitan is the original pizza and there are three official variants: Pizza Marinara, Pizza Margherita and Pizza margherita extra. The typical Neapolitan pizza toppings are fresh mozzarella, tomatoes, basil leaves, oregano, and olive oil."
          rows="3"
          value={formPayload.description}
          onChange={handleInputChange}
        />
      </div>

      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default NewPizzaStyleForm
