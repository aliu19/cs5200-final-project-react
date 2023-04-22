const API = "http://127.0.0.1:8000"

export const register = (user) =>
  fetch(`${API}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const login = (credentials, setToken, setCurrentUser) =>
    fetch(`${API}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      response.json().then((data) => {
        if (data.access_token) {
          setToken(data.access_token)
          setCurrentUser({
            username: data.username,
            password :data.password,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email
          })
        }
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })

export const logout = (token, removeUser) =>
    fetch(`${API}/logout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      token()
      removeUser()
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })

export const profile = (token, username) =>
    fetch(`${API}/user/${username}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const update_profile = (token, user, setCurrentUser) =>
    fetch(`${API}/user/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => {
      setCurrentUser(user)
      return response.json()
    })

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

export const get_trip = (token, tripId, username) =>
    fetch(`${API}/trip/${tripId}/${username}`, {
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

export const delete_trip = (token, tripId) =>
    fetch(`${API}/trip/${tripId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const get_expenses = (token, tripId) =>
    fetch(`${API}/trip/${tripId}/expenses`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const delete_expense = (token, expenseId) =>
    fetch(`${API}/expense/${expenseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const createExpense = (token, expenseInfo) =>
    fetch(`${API}/expense`, {
      method: 'POST',
      body: JSON.stringify(expenseInfo),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())

export const updateExpense = (token, expenseId, username) =>
    fetch(`${API}/expense/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify({
        "username": username
      }),
      headers: {
        'content-type': 'application/json',
        Authorization: "Bearer " + token
      }
    }).then(response => response.json())
