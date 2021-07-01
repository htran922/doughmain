import React, { useEffect, useState } from "react"
import { getData } from "../public/js/jsonFetch"

const PizzaStyleField = props => {
  const [pizzaStyles, setPizzaStyles] = useState([])

  const fetchPizzaStyles = async () => {
    try {
      const pizzaStylesData = await getData("/api/v1/pizza-styles")
      pizzaStylesData.pizzaStyles.unshift({ name: "", id: null })
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
      <label htmlFor="pizzaStyleId">Pizza Style</label>
      <select
        name="pizzaStyleId"
        id="pizzaStyleId"
        onChange={props.handleInputChange}
        value={props.pizzaStyleId}
      >
        {pizzaStyleOptions}
      </select>
    </div>
  )
}

export default PizzaStyleField
