import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"

import PizzaStylesIndex from "./PizzaStylesIndex"
import PizzaStyleShow from "./PizzaStyleShow"
import NewPizzaStyleForm from "./NewPizzaStyleForm"
import NewReviewForm from "./NewReviewForm"
import UpdateReviewForm from "./UpdateReviewForm"
import NotFoundPage from "./NotFoundPage"

const NavBar = () => {
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
      setPizzaStyles(pizzaStylesData.pizzaStyles)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyles()
  }, [])

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
        <div className="top-bar">
          <div className="dropdown menu" data-dropdown-menu>
            <li>
              <Link to={`/pizza-styles`}>Pizza Styles</Link>
              <ul className="menu">{pizzaStyleLinks}</ul>
            </li>
          </div>
          <div className="top-bar-right">
            <div>
              <Link className="button label" to={`/reviews/new`}>
                {" "}
                <i className="fas fa-pencil-alt"></i> Write A Review
              </Link>
            </div>
          </div>
        </div>
        
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/pizza-styles" />
        </Route>
        <Route exact path="/pizza-styles" component={PizzaStylesIndex} />
        <Route exact path="/pizza-styles/new" component={NewPizzaStyleForm} />
        <Route exact path="/pizza-styles/:id" component={PizzaStyleShow} />
        <Route exact path="/reviews/new" component={NewReviewForm} />
        <Route exact path="/reviews/:id/edit" component={UpdateReviewForm} />
        <Route exact path="/404" component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <div className="text-center">
          <footer>
            <h3>Contact Us</h3>
            <h3>
              <i className="fab fa-facebook-messenger"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-github"></i>
              <i className="fab fa-reddit-alien"></i>
            </h3>
          </footer>
        </div>
    </div>
  )
}

export default NavBar
