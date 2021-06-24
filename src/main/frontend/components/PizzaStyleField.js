import React, { useEffect, useState } from "react"

const PizzaStyleField = props => {
  const [pizzaStyles, setPizzaStyles] = useState([])

  const fetchPizzaStyles = async () => {
    try {
      const response = await fetch("/api/v1/pizza-styles")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const pizzaStylesData = await response.json()
      pizzaStylesData.pizzaStyles.unshift({name: "", id: null})
      setPizzaStyles(pizzaStylesData.pizzaStyles)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyles()
  }, [])

  const pizzaStyleOptions = pizzaStyles.map(style => {
    return (
      <option value={style.id} key={style.id}>
        {style.name}
      </option>
    )
  })

  return (
    <div>
      <label htmlFor="pizzaStyleId">Pizza Style:</label>
      <select name="pizzaStyleId" id="pizzaStyleId" onChange={props.handleInputChange} value={props.pizzaStyleId}>
        {pizzaStyleOptions}
      </select>
    </div>
  )
}

export default PizzaStyleField
