import { API_KEY, URL_NEWS } from './constants'
const getNews = (keyword) => {
  const toDate = new Date()
  const fromDate = new Date()
  fromDate.setDate(toDate.getDate() - 7)

  return fetch(
    `${URL_NEWS}?q=${keyword}&from=${fromDate}&to=${toDate}&pageSize=10&apiKey=${API_KEY}`,
  ).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error ${res.status}`)
  })
}

export default getNews
