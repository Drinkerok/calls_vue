const checkStatus = response => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

function getURLwithParameters(params = {}, url) {
  let paramsString = ``;
  for (let key in params) {
    const value = params[key];

    if (!value) continue;

    paramsString = `${paramsString}&${key}=${value}`;
  }
  paramsString = paramsString === `` ? `` : `?${paramsString.slice(1)}`;

  return `${url}${paramsString}`;
}

export default function loader(url, data = {}) {
  const urlWithParams = getURLwithParameters(data, url);

  return fetch(urlWithParams)
    .then(checkStatus)
    .then(response => response.json());
}
