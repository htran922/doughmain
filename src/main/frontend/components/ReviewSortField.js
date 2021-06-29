import React, { useState } from "react"

const ReviewSortField = props => {
  const options = [
    { id: 0, value: "", label: "" },
    { id: 1, value: '{"field": "rating", "order": "descending"}', label: "Rating (High to Low)" },
    { id: 2, value: '{"field": "rating", "order": "ascending"}', label: "Rating (Low to High)" },
    { id: 3, value: '{"field": "createdAt", "order": "descending"}', label: "Most Recent" },
    { id: 4, value: '{"field": "createdAt", "order": "ascending"}', label: "Oldest to Newest" }
  ]

  const sortOptions = options.map(option => {
    return (
      <option key={option.id} value={option.value}>
        {option.label}
      </option>
    )
  })

  return (
    <div>
      <label htmlFor="sortSelect">Sort By </label>
      <select
        id="sortSelect"
        value={props.sortOption}
        name="sortSelect"
        onChange={props.handleSortSelect}
      >
        {sortOptions}
      </select>
    </div>
  )
}

export default ReviewSortField
