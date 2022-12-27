import './CardList.css'
import Card from '../Card/Card'
import { useHistory } from 'react-router-dom'

function CardList(props) {
  const history = useHistory()
  return (
    <section className="cardlist">
      {history.location.pathname === '/' && (
        <h1 className="cardlist__result-title">Search results</h1>
      )}
      <div className="cardlist__content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

      </div>
      {history.location.pathname === '/' && (
        <button type='button' className="cardlist__more-button">Show more</button>
      )}
    </section>
  )
}
export default CardList
