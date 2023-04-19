const API = "http://127.0.0.1:8000"

export const register = (user) =>
  fetch(`${API}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const login = (credentials, setToken) =>
    fetch(`${API}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      response.json().then((data) =>
          setToken(data.access_token)
      )
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })

export const logout = (token) =>
    fetch(`${API}/logout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => token())
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })

export const profile = (token) =>
    fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const update_profile = (token, user) =>
    fetch(`${API}/profile`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const get_trips = (token, username) =>
    fetch(`${API}/user/${username}/trips`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const create_trip = (token, tripInfo) =>
    fetch(`${API}/trip`, {
      method: 'POST',
      body: JSON.stringify(tripInfo),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const get_trip = (token, tripId) =>
    fetch(`${API}/trip/${tripId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const update_trip = (token, tripId, tripInfo) =>
    fetch(`${API}/trip/${tripId}`, {
      method: 'PUT',
      body: JSON.stringify(tripInfo),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())
