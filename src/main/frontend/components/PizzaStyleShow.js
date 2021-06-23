import React, {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import ReviewTile from "./ReviewTile";
import PizzaStyleTile from "./PizzaStyleTile";
import {jsonGet, jsonPut, jsonPost, jsonDelete} from "./jsonFetch";

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({reviews: []})
  let location = useLocation()

  const fetchPizzaStyle = async () => {
    const respBody = await jsonGet(`/api/v1/pizza-styles/${props.match.params.id}`)
    setPizzaStyle(respBody.pizzaStyle);
  }

  useEffect(() => {
    fetchPizzaStyle()
  }, [location.pathname])

  const callBack = (data) => {
    fetchPizzaStyle();
  }

  const deleteReview = async (url) => {
    await jsonDelete(url, callBack);
  }
  const onClick = event => {
    if (event.target.value.includes("delete")) {
      let id = event.target.value.split(":")[1];
      deleteReview(`/api/v1/pizza-styles/delete/${id}`)

    } else if (event.target.value.includes("edit")) {
      let id = event.target.value.split(":")[1];
      /***** TODO: Hit endPoint to redirect to prepopluated form ***
       * Then use jsonPut or add an UPDATE method
       */
    }
  }

  const reviewTiles = pizzaStyle.reviews.map(review => {
    return (
        <div key={review.id}>
          <ReviewTile
              review={review}
          />
          <div className="small button-group">
            <button type="button" value={`edit:${review.id}`} onClick={onClick}
                    className="success button">Edit
            </button>
            <button type="button" value={`delete:${review.id}`}
                    onClick={onClick} className="alert button">Delete
            </button>
          </div>
        </div>
    )
  })

  return (
      <div>
        <PizzaStyleTile
            key={pizzaStyle.id}
            pizzaStyle={pizzaStyle}
        />
        {reviewTiles}
      </div>
  )
}
export default PizzaStyleShow
