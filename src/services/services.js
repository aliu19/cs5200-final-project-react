const API = "http://127.0.0.1:8000"

export const register = (user) => {
  console.log('Received values of form: ', user)
  fetch(`${API}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
}


