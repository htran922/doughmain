import React, {useEffect, useState} from "react"
import ReviewTile from "./ReviewTile";
import PizzaStyleTile from "./PizzaStyleTile";
import {jsonGet, jsonPut, jsonPost, jsonDelete} from "./jsonFetch";

const PizzaStyleShow = props => {
  const [pizzaStyle, setPizzaStyle] = useState({reviews: []})
  const fetchPizzaStyle = async () => {
    try {
      const response = await fetch(
          `/api/v1/pizza-styles/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const pizzaStyleData = await response.json()
      setPizzaStyle(pizzaStyleData.pizzaStyle)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchPizzaStyle()
  }, [])

  const callBack = (data) => {
    alert("callBack( " + value + " )");
  }

  const deleteReview = async (url) => {
    callBack(await jsonDelete(url));
  }
  const onClick = event => {
    if (event.target.value.includes("delete")) {
      let id = event.target.value.split(":")[1];
      alert(`/api/v1/pizza-styles/delete/${id}`);
      deleteReview(`/api/v1/pizza-styles/delete/${id}`)

    } else if (event.target.value.includes("edit")) {
      let id = event.target.value.split(":")[1];
      alert(`/api/v1/pizza-styles/edit/${id}`);
      jsonPut(`/api/v1/pizza-styles/edit/${id}`, "", callBack);
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