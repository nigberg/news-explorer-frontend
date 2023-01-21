import './SearchForm.css'
import { useState } from 'react'

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const handleChange = (evt) => {
    setKeyword(evt.target.value)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSearch(keyword)
  }
  return (
    <form
      className="search-form"
      action="#"
      name="searchForm"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        onChange={handleChange}
        required
        name="keywords"
        placeholder="Enter topic"
        className="search-form__input"
      />
      <button type="submit" className="search-form__submit-button">
        Search
      </button>
    </form>
  )
}
export default SearchForm
