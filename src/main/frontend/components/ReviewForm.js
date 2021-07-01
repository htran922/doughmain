import React from "react"
import PizzaStyleField from "./PizzaStyleField"
import ErrorList from "./ErrorList"
import StarRating from "./StarRating"
import ImageDropzone from "./ImageDropzone"

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

      <StarRating formRating={formPayload.rating} handleRatingChange={handleRatingChange} />

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
        <label htmlFor="comment">Tell Us What You Think </label>
        <textarea
          name="comment"
          id="comment"
          placeholder="This may be one of my favorite pizza styles out there. It's definitely better with olives and feta cheese in my opinion, but it's the sauce that really matters in the end and where you get it from of course."
          rows="3"
          value={formPayload.comment}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="imgFile">Upload Image </label>
        <ImageDropzone handleImageUpload={handleImageUpload} />
      </div>

      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default ReviewForm
