const jsonGet = async (url) => {
  let responseData = null;
  try {
    const response = await fetch(url);
    console.log("jsonGetch() response: " + response);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw (error)
    }
    responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`)
    return null;
  }
}

//Callback should set state to cause view to update.
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

const jsonPut = async (url, payload, callback) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
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


const jsonDelete = async (url, callback) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      //body: JSON.stringify(payload)
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

export {jsonGet, jsonPut, jsonPost, jsonDelete};

