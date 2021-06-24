import React from "react"

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="error-page">
        <img
          src={"https://miro.medium.com/max/1068/1*wUOrpv-selJOytCkslSIhg.png"}
          className="pizza-image"
        />
        <h2>Page Not Found!</h2>
      </div>
    )
  }
}
export default NotFoundPage
