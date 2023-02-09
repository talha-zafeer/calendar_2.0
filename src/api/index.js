export const apiService = (
  endpoint,
  method = null,
  body = null,
  header = false
) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: method,
      body: body,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const apiServiceWithoutHeader = (endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((cities) => {
        resolve(cities);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
