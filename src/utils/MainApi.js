import { URL_MAIN } from './constants'

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error ${res.status}`)
  }

  validateToken(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: { ...this._headers, authorization: 'Bearer ' + token },
    }).then(this._checkResponse)
  }

  register(user) {
    return fetch(this._baseUrl + '/signup', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: user.username,
        email: user.email,
        password: user.password,
      }),
    }).then(this._checkResponse)
  }

  authenticate(user) {
    return fetch(this._baseUrl + '/signin', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }).then(this._checkResponse)
  }

  getSavedCards(token) {
    return fetch(this._baseUrl + '/articles', {
      headers: { ...this._headers, authorization: 'Bearer ' + token },
    }).then(this._checkResponse)
  }

  saveCard(card, token, keyword) {
    return fetch(this._baseUrl + '/articles', {
      method: 'POST',
      headers: { ...this._headers, authorization: 'Bearer ' + token },
      body: JSON.stringify({
        keyword: keyword,
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        image: card.urlToImage,
      }),
    }).then(this._checkResponse)
  }

  removeCard(card, token) {
    return fetch(this._baseUrl + '/articles/' + card._id, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: 'Bearer ' + token },
    }).then(this._checkResponse)
  }
}

const mainApi = new MainApi({
  baseUrl: URL_MAIN,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default mainApi
