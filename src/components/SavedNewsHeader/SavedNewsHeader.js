import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Nav from '../Nav/Nav'
import './SavedNewsHeader.css'

function SavedNewsHeader({
  isLoggedIn,
  keywords = ['politique', 'musique', 'cuisine francaise', 'theatre'],
  cards = [1, 2, 3, 4],
}) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <header className="saved-news-header">
      <Nav isLoggedIn={isLoggedIn} />
      <div className="saved-news-header__container">
        <h1 className="saved-news-header__title">Saved articles</h1>
        <p className="saved-news-header__text">
          {currentUser.name}, you have {cards.length} saved articles
        </p>
        <p className="saved-news-header__keywords">
          By keywords: &nbsp;
          <span className="saved-news-header__highlited-keywords">
            {keywords[0]}, {keywords[1]}, and {keywords.length - 2}
            other
          </span>
        </p>
      </div>
    </header>
  )
}
export default SavedNewsHeader
