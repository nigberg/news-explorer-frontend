import './CardList.css'
import Card from '../Card/Card'
import { useHistory } from 'react-router-dom'

function CardList({isLoggedIn}) {
  const history = useHistory()
  return (
    <section className="cardlist">
      {history.location.pathname === '/' && (
        <h2 className="cardlist__result-title">Search results</h2>
      )}
      <div className="cardlist__content">
        <Card isLoggedIn={isLoggedIn} />
        <Card isLoggedIn={isLoggedIn} />
        <Card isLoggedIn={isLoggedIn} />
        <Card isLoggedIn={isLoggedIn} />
        <Card isLoggedIn={isLoggedIn} />
        <Card isLoggedIn={isLoggedIn} />

      </div>
      {history.location.pathname === '/' && (
        <button type='button' className="cardlist__more-button">Show more</button>
      )}
    </section>
  )
}
export default CardList
