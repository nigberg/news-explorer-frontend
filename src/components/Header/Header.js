import './Header.css'
import Nav from '../Nav/Nav'
import SearchSection from '../SearchSection/SearchSection'

function Header({ isLoggedIn, onSignIn, onSignOut }) {
  return (
    <header className="header">
      <Nav isLoggedIn={isLoggedIn} onSignIn={onSignIn} onSignOut={onSignOut}  />
      <SearchSection />
    </header>
  )
}
export default Header
