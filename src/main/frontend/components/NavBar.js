import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect, Link } from "react-router-dom"

import PizzaStylesIndex from "./PizzaStylesIndex"
import PizzaStyleShow from "./PizzaStyleShow"
import NewPizzaStyleForm from "./NewPizzaStyleForm"
import NewReviewForm from "./NewReviewForm"
import UpdateReviewForm from "./UpdateReviewForm"
import NotFoundPage from "./NotFoundPage"
import Footer from "./Footer"

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
    <div className="page-container">
      <div className="content-wrap">
        <div className="top-bar">
          <div className="top-bar-left">
            <Link to={`/pizza-styles`}>
              <h4> doughmain </h4>
            </Link>
          </div>
          <div className="top-bar-right">
            <div className="dropdown menu" data-dropdown-menu>
              <li>
                <Link className="styles-link" to={`/pizza-styles`}>
                  Pizza Styles
                </Link>
                <ul className="menu">{pizzaStyleLinks}</ul>
              </li>
            </div>
            <div>
              <Link className="button label" to={`/reviews/new`}>
                {" "}
                <i className="fas fa-pencil-alt"></i> Write A Review
              </Link>
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
      </div>
      <Footer />
    </div>
  )
}

export default NavBar
