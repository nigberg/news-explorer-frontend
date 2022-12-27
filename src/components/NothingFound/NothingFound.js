import './NothingFound.css'
import picture from '../../images/notfound.svg'

function NothingFound() {
  return (
    <section className="nothing-found">
      <img className="nothing-found__image" src={picture} alt="Nothing Found" />
      <h1 className="nothing-found__title">Nothing found</h1>
      <p className="nothing-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  )
}
export default NothingFound
