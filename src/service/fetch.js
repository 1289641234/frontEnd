const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:7080"
    : "http://42.192.39.195:7080";
export function fetchService(url, options = {}) {
  if (!options.headers) {
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  return fetch(BASE_URL + url, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
