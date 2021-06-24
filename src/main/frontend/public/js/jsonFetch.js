const jsonGet = async (url) => {
  let responseData = null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw (error)
    }
    responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`)
    return null;
  }
}

//Callback should set state to cause view to update as needed.
const jsonPost = async (url, payload, callback) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw (error);
    }
    const body = await response.json();
    //The model has been updated. We are done. Handle
    //concat of data.strKey to existing state be handled by
    //client of this function, which will invoke a rendering
    callback(body);

  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`);
  }
}

//Callback should set state to cause view to update as needed.
const jsonPut = async (url, payload, errorsCallback, redirectCallback) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
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
        throw(error)
      }
    }

    redirectCallback(true)

  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`);
  }
}

//Callback should set state to cause view to update as needed.
const jsonDelete = async (url, callback) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw (error);
    }
    //client of this function, which will invoke a rendering
    callback();
  } catch (err) {
    console.error(`Error in fetch: ${err.status} (${err.message})`);
  }
}

export {jsonGet, jsonPut, jsonPost, jsonDelete};

