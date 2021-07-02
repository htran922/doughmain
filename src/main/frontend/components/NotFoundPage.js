import React from "react"

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-image">
          <img src={"https://miro.medium.com/max/1068/1*wUOrpv-selJOytCkslSIhg.png"} />
          <h2>Page Not Found!</h2>
        </div>
      </div>
    )
  }
}
export default NotFoundPage
