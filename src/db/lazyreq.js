/** *
 * LazyReq - simple library for making http requests
 *
 * version  2.0 (es6)
 */

class lazyReq {
  // get
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // post
  post(url, data, isJsonObj = true) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // no need of stringifying a JSON string
        body: isJsonObj ? JSON.stringify(data) : data,
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // put
  put(url, data, isJsonObj = true) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: isJsonObj ? JSON.stringify(data) : data,
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // patch
  patch(url, data, isJsonObj = true) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: isJsonObj ? JSON.stringify(data) : data,
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // delete
  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(`resource deleted`))
        .catch((error) => reject(error));
    });
  }
}

export default lazyReq;
