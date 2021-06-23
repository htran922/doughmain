import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect, Link, useLocation } from "react-router-dom";

import PizzaStylesIndex from "./PizzaStylesIndex"
import PizzaStyleShow from "./PizzaStyleShow"
import NewPizzaStyleForm from "./NewPizzaStyleForm"

const NavBar = () => {
  const [pizzaStyles, setPizzaStyles] = useState([])
  let location = useLocation();

  const fetchPizzaStyles = async () => {
    try {
      const response = await fetch("/api/v1/pizza-styles")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const pizzaStylesData = await response.json()
      setPizzaStyles(pizzaStylesData.pizzaStyles)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyles()
  }, [location.pathname])

  const pizzaStyleLinks = pizzaStyles.map(style => {
    return (
      <li key={style.id}>
        <Link to={`/pizza-styles/${style.id}`}>{style.name}</Link>
      </li>
    )
  })

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <Link to={`/pizza-styles`}>
            <h5>doughmain</h5>
          </Link>
        </div>
        <div className="top-bar-right">
          <div className="dropdown menu" data-dropdown-menu>
            <li>
              <Link to={`/pizza-styles`}>Find Reviews By Pizza Style</Link>
              <ul className="menu">{pizzaStyleLinks}</ul>
            </li>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pizza-styles" />
        </Route>
        <Route exact path="/pizza-styles" component={PizzaStylesIndex} />
        <Route exact path="/pizza-styles/new" component={NewPizzaStyleForm}/>
        <Route exact path="/pizza-styles/:id" component={PizzaStyleShow} />
      </Switch>
    </div>
  )
}

export default NavBar
