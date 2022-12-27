import './Card.css'
import testImg from '../../images/test-image.png'
import { useHistory } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card({ isLoggedIn, card, onSave, onDelete }) {
  const history = useHistory()
  const currentUser = useContext(CurrentUserContext)
  const [isSaved, setIsSaved] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    if (
      currentUser.savedArticles &&
      currentUser.savedArticles.some((article) => article.link === card.url)
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

  const handleSave = () => {
    if (isSaved) {
      onDelete(card)
    } else {
      onSave(card)
    }
    setIsSaved(!isSaved)
  }
  const handleDelete = () => {
    onDelete(card)
  }
  return (
    <article className="card">
      <img alt="News article" src={testImg} className="card__image" />
      <div className="card__description">
        <div className="card__date">November 4, 2020</div>
        <h1 className="card__title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h1>
        <p className="card__text">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special...
        </p>
        <div className="card__source">treehugger</div>
      </div>
      {history.location.pathname === '/saved-news' && (
        <button
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="card__button card__button_type_delete"
        />
      )}
      {history.location.pathname === '/' && !isSaved && (
        <button
          type="button"
          onMouseEnter={!isLoggedIn && handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="card__button card__button_type_save"
        />
      )}
      {history.location.pathname === '/' && isSaved && (
        <button
          type="button"
          className="card__button card__button_type_saved"
        />
      )}
      {history.location.pathname === '/saved-news' && (
        <div className="card__keyword">some_keyword</div>
      )}
      <div className={`card__label ${isButtonHovered && 'card__label_visible'}`}>
        {history.location.pathname === '/saved-news'
          ? 'Remove from saved'
          : (!isLoggedIn && 'Log in to save articles')}
      </div>
    </article>
  )
}
export default Card
