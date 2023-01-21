import './Header.css'
import Nav from '../Nav/Nav'
import SearchSection from '../SearchSection/SearchSection'

function Header({ isLoggedIn, onSignIn, onSignOut, onSearch }) {
  return (
    <header className="header">
      <Nav isLoggedIn={isLoggedIn} onSignIn={onSignIn} onSignOut={onSignOut}  />
      <SearchSection onSearch={onSearch} />
    </header>
  )
}
export default Header
