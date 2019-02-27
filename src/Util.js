import { flip, tap, uncurryN } from 'ramda'

export const graphRequest = variables => query =>
  fetch(process.env.REACT_APP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
    .then(response => response.json())
    .then(json => {
      if (json.errors)
          throw Error(json.errors);

      return json.data;
    })


export const graphQuery = graphRequest({})


export const graphMutate = flip(uncurryN(2, graphRequest))


export const withoutDefault = callable => event => {
  event.preventDefault();

  callable(event);
}


export const preventDefault = tap(event =>
  event.preventDefault()
)
