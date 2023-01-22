import './CardList.css'
import Card from '../Card/Card'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { v4 as uuid } from 'uuid'

function CardList({
  isLoggedIn,
  showMoreButtonVisible,
  cards,
  onShowMoreClick,
  onSave,
  onDelete,
  onUnauthorizedClick,
  currentKeyword,
}) {
  const currentUser = useContext(CurrentUserContext)
  const history = useHistory()
  if (history.location.pathname === '/') {
    return (
      <section className="cardlist">
        <h2 className="cardlist__result-title">Search results</h2>
        <div className="cardlist__content">
          {cards.map((card, i) => (
            <Card
              isLoggedIn={isLoggedIn}
              onDelete={onDelete}
              onSave={onSave}
              card={card}
              key={uuid()}
              onUnauthorizedClick={onUnauthorizedClick}
              currentKeyword={currentKeyword}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onShowMoreClick}
          className={`cardlist__more-button ${
            !showMoreButtonVisible && 'cardlist__more-button_hidden'
          }`}
        >
          Show more
        </button>
      </section>
    )
  } else {
    return (
      <section className="cardlist">
        <div className="cardlist__content">
          {currentUser.savedCards.map((card, i) => (
            <Card
              isLoggedIn={isLoggedIn}
              onDelete={onDelete}
              onSave={onSave}
              card={card}
              key={uuid()}
              currentKeyword={currentKeyword}
            />
          ))}
        </div>
      </section>
    )
  }
}
export default CardList
