const getData = async url => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    return responseBody
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

const postData = async (url, payload, errorsCallback) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        return errorsCallback(body.errors)
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    }

    const body = await response.json()
    return body
  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`)
  }
}

const jsonPut = async (url, payload, errorsCallback, redirectCallback) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        return errorsCallback(body.errors)
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    }

    redirectCallback(true)
  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`)
  }
}

const jsonDelete = async (url, callback) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    callback()
  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`)
  }
}

export { getData, jsonPut, postData, jsonDelete }
