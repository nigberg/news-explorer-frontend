import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import About from '../About/About'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import NothingFound from '../NothingFound/NothingFound'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import CardList from '../CardList/CardList'
import SuccessPopup from '../SuccessPopup/SuccessPopup'
import LoginPopup from '../LoginPopup/LoginPopup'
import RegisterPopup from '../RegisterPopup/RegisterPopup'
import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "Georges D'Anthes" })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [LoginError, setLoginError] = useState(false)

  const closeAllPopups = () => {
    setIsSuccessPopupOpen(false)
    setIsRegisterPopupOpen(false)
    setIsLoginPopupOpen(false)
  }

  const onSigninClick = () => {
    setIsLoginPopupOpen(true)
    setLoginError(false)
  }

  const onSignupClick = () => {
    setIsRegisterPopupOpen(true)
    setRegisterError(false)
  }

  const register = () => {}

  const login = () => {}

  const signout = () => {}

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/saved-news">
            <SavedNewsHeader isLoggedIn={isLoggedIn} />
            <CardList />
          </Route>
          <Route path="*">
            <Header isLoggedIn={isLoggedIn} onSignIn={onSigninClick} onSignOut={signout} />
            <CardList />
            <About />
          </Route>
        </Switch>
        <Footer />
        <SuccessPopup
          onClose={closeAllPopups}
          isOpen={isSuccessPopupOpen}
          onSigninClick={onSigninClick}
        />
        <RegisterPopup
          onRegister={register}
          onClose={closeAllPopups}
          isOpen={isRegisterPopupOpen}
          onSigninClick={onSigninClick}
          isCommonError={registerError}
        />
        <LoginPopup
          onLogin={login}
          onClose={closeAllPopups}
          isOpen={isLoginPopupOpen}
          onSignupClick={onSignupClick}
          isCommonError={LoginError}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
