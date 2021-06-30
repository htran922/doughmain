import React from "react"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"
import StarRating from "./StarRating"

const ReviewForm = props => {
  const {
    formTitle,
    handleSubmit,
    handleInputChange,
    handleImageUpload,
    handleRatingChange,
    formPayload,
    errors
  } = props
  return (
    <form className="callout form" onSubmit={handleSubmit}>
      <h2>{formTitle}</h2>
      <ErrorList errors={errors} />
      <PizzaStyleField
        handleInputChange={handleInputChange}
        pizzaStyleId={formPayload.pizzaStyleId}
      />
      <div>
        <label htmlFor="title">Title </label>
        <input
          name="title"
          id="title"
          type="text"
          value={formPayload.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="comment">Comment </label>
        <input
          name="comment"
          id="comment"
          type="text"
          value={formPayload.comment}
          onChange={handleInputChange}
        />
      </div>

      <StarRating formRating={formPayload.rating} handleRatingChange={handleRatingChange} />

      <div>
        <label htmlFor="imgFile">Image </label>
        <input
          name="imgFile"
          id="imgFile"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default ReviewForm
