import { Link, NavLink, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useContext, useState } from 'react'
import logoutWhitePic from '../../images/logout-white.svg'
import logoutBlackPic from '../../images/logout-black.svg'
import './Nav.css'

function Nav({ isLoggedIn, onSignIn, onSignOut }) {
  const currentUser = useContext(CurrentUserContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const history = useHistory()
  const classModifier = history.location.pathname === '/' ? '' : '_saved'
  const exitIcon =
    history.location.pathname === '/' ? logoutWhitePic : logoutBlackPic

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    } else {
      setIsMobileMenuOpen(true)
    }
  }
  return (
    <>
      <nav className={'nav nav' + classModifier}>
        <Link to="/" className={'nav__logo nav__logo' + classModifier}>
          NewsExplorer
        </Link>
        <div className={'nav__menu nav__menu' + classModifier}>
          <NavLink
            exact
            to="/"
            className={'nav__link nav__link' + classModifier}
            activeClassName="nav__link_active"
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/saved-news"
              className={'nav__link nav__link' + classModifier}
              activeClassName="nav__link_active"
            >
              Saved articles
            </NavLink>
          )}
          <button
            type="button"
            className={'sign-button sign-button' + classModifier}
            onClick={isLoggedIn ? onSignOut : onSignIn}
          >
            {!isLoggedIn ? (
              'Sign in'
            ) : (
              <>
                {currentUser.name} <img src={exitIcon} alt="logout" />
              </>
            )}
          </button>
        </div>
      </nav>
      {!isMobileMenuOpen ? (
        <nav className={'nav-mobile nav-mobile' + classModifier}>
          <Link
            to="/"
            className={'nav-mobile__logo nav-mobile__logo' + classModifier}
          >
            NewsExplorer
          </Link>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={
              'nav-mobile__hamburger-button nav-mobile__hamburger-button' +
              classModifier
            }
          />
        </nav>
      ) : (
        <nav className="nav-mobile-open">
          <div className="nav-mobile-open__top">
            <Link to="/" className="nav-mobile__logo nav__logo">
              NewsExplorer
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="nav-mobile__close-button"
            />
          </div>
          <NavLink to='/' className='nav-mobile-open__link'>Home</NavLink>
          {isLoggedIn && <NavLink to='/saved-news' className='nav-mobile-open__link'>Saved articles</NavLink>}
          <button
            type="button"
            className='sign-button nav-mobile-open__sign-button'
            onClick={isLoggedIn ? onSignOut : onSignIn}
          >
            {!isLoggedIn ? (
              'Sign in'
            ) : (
              <>
                {currentUser.name} <img src={exitIcon} alt="logout" />
              </>
            )}
          </button>
        </nav>
      )}
    </>
  )
}
export default Nav
