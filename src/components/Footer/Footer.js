import fbIcon from '../../images/fb.svg'
import ghIcon from '../../images/gh.svg'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </div>
      <nav className="footer__links">
        <Link to="/" className="footer__link footer__link-home">
          Home
        </Link>
        <a href="https://practicum.com/en-isr" className="footer__link footer__link-practicum" target='_blank'>
          Practicum
        </a>
        <a href="https://github.com/nigberg" className="footer__link" target='_blank'>
          <img className="footer__icon footer__gh" src={ghIcon} alt='github' />
        </a>
        <a href="https://facebook.com/nigberg" className="footer__link" target='_blank'>
          <img className="footer__icon footer__fb" src={fbIcon} alt='facebook' />
        </a>
      </nav>
    </footer>
  )
}
export default Footer