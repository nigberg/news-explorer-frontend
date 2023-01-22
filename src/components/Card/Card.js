import './Card.css'
import testImg from '../../images/test-image.png'
import { useHistory } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card({ isLoggedIn, card, onSave, onDelete, onUnauthorizedClick }) {
  const history = useHistory()
  const currentUser = useContext(CurrentUserContext)
  const [isSaved, setIsSaved] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    if (
      isLoggedIn &&
      currentUser.savedCards &&
      currentUser.savedCards.some((article) => article.link === card.url)
    ) {
      setIsSaved(true)
    }
  }, [])
  const handleMouseEnter = () => {
    setIsButtonHovered(true)
  }
  const handleMouseLeave = () => {
    setIsButtonHovered(false)
  }

  const handleSaveClick = (evt) => {
    evt.preventDefault()
    if (!isLoggedIn) {
      onUnauthorizedClick()
    } else {
      if (!isSaved) {
        onSave(card)
      } else {
        const cardToDelete = currentUser.savedCards.find(
          (currCard) => currCard.link === card.url,
        )
        onDelete(cardToDelete)
      }
      setIsSaved(!isSaved)
    }
  }
  const handleDelete = (evt) => {
    evt.preventDefault()
    onDelete(card)
  }
  function getDateString() {
    const date = new Date(card.publishedAt || card.date)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <article className="card">
      <a href={card.url || card.link} target="_blank" className="card__link">
        <img
          alt="News article"
          src={card.urlToImage || card.image}
          className="card__image"
        />
        <div className="card__description">
          <div className="card__date">{getDateString()}</div>
          <h2 className="card__title">{card.title}</h2>
          <p className="card__text">{card.description || card.text}</p>
          <div className="card__source">
            {!card.source.name ? card.source : card.source.name}
          </div>
        </div>
        {history.location.pathname === '/saved-news' && (
          <button
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="card__button card__button_type_delete"
            onClick={handleDelete}
          />
        )}
        {history.location.pathname === '/' && !isSaved && (
          <button
            type="button"
            onMouseEnter={!isLoggedIn ? handleMouseEnter : undefined}
            onMouseLeave={!isLoggedIn ? handleMouseLeave : undefined}
            className="card__button card__button_type_save"
            onClick={handleSaveClick}
          />
        )}
        {history.location.pathname === '/' && isSaved && (
          <button
            type="button"
            className="card__button card__button_type_saved"
            onClick={handleSaveClick}
          />
        )}
        {history.location.pathname === '/saved-news' && (
          <div className="card__keyword">{card.keyword}</div>
        )}
        <div
          className={`card__label ${isButtonHovered && 'card__label_visible'}`}
        >
          {history.location.pathname === '/saved-news'
            ? 'Remove from saved'
            : !isLoggedIn && 'Log in to save articles'}
        </div>
      </a>
    </article>
  )
}
export default Card
