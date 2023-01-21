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
import { useState, useEffect, useRef } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import getNews from '../../utils/NewsApi'
import { ADDED_CARDS } from '../../utils/constants'
import mainApi from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [LoginError, setLoginError] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isLoadingNews, setIsLoadingNews] = useState(false)
  const fetchedCards = useRef([])
  const [renderedCards, setRenderedCards] = useState([])
  const [wasSearch, setWasSearch] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState('')
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState(true)
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'))

  const history = useHistory()

  // validate JWT & set current user data
  useEffect(() => {
    if (jwt) {
      mainApi
        .validateToken(jwt)
        .then((res) => {
          if (res.data._id) {
            setCurrentUser(res.data)
            setIsLoggedIn(true)
          } else {
            localStorage.removeItem('jwt')
          }
        })
        .catch(console.log)
    }
  }, [jwt])

  // Saved articles fetching & updating in current uset object
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedCards(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              ...currentUser,
              savedCards: res.data,
            })
          }
        })
        .catch(console.log)
    }
  }, [isLoggedIn])

  // 'Show more' button visibility control
  useEffect(() => {
    if (fetchedCards.current.length > renderedCards.length) {
      setShowMoreButtonVisible(true)
    } else {
      setShowMoreButtonVisible(false)
    }
  }, [fetchedCards.current, renderedCards])


  const onUnauthorizedClick = () => {
    setIsLoginPopupOpen(true)
  }

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

  const handleSave = (card) => {
    mainApi
      .saveCard(card, jwt, currentKeyword)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          savedCards: [res.data, ...currentUser.savedCards],
        })
        console.log(res)
        console.dir(currentUser)
      })
      .catch(console.log)
  }

  const handleDelete = (card) => {
    mainApi
      .removeCard(card, jwt)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          savedCards: currentUser.savedCards.filter(
            (currCard) => currCard._id !== card._id,
          ),
        })
      })
      .catch(console.log)
  }

  const handleSearch = (keyword) => {
    setIsLoadingNews(true)
    setShowMoreButtonVisible(true)
    setCurrentKeyword(keyword.charAt(0).toUpperCase() + keyword.slice(1))
    getNews(keyword)
      .then((res) => {
        if (res.articles) {
          fetchedCards.current = res.articles
          setRenderedCards(fetchedCards.current.slice(0, ADDED_CARDS))
          localStorage.setItem('searchResult', res.articles)
          setWasSearch(true)
          console.log(currentKeyword)
        }
      })
      .catch(console.log)
      .finally(() => {
        setIsLoadingNews(false)
      })
  }

  const onShowMoreClick = () => {
    setRenderedCards(
      fetchedCards.current.slice(0, renderedCards.length + ADDED_CARDS),
    )
  }

  const register = (userData) => {
    setIsWaiting(true)
    setRegisterError(false)
    mainApi
      .register(userData)
      .then((user) => {
        if (user.data._id) {
          setIsRegisterPopupOpen(false)
          setIsSuccessPopupOpen(true)
        }
      })
      .catch((err) => {
        setRegisterError(true)
      })
      .finally(() => {
        setIsWaiting(false)
      })
  }

  const login = (userData) => {
    setIsWaiting(true)
    setLoginError(false)
    mainApi
      .authenticate(userData)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setJwt(res.token)
        setIsLoginPopupOpen(false)
      })
      .catch((err) => {
        setLoginError(true)
      })
      .finally(() => {
        setIsWaiting(false)
      })
  }

  const signout = () => {
    localStorage.removeItem('jwt')
    setJwt('')
    setIsLoggedIn(false)
    setCurrentUser({})
    setIsLoginPopupOpen(true)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/saved-news"
          >
            <SavedNewsHeader isLoggedIn={isLoggedIn} onSignOut={signout} />
            <CardList
              isLoggedIn={isLoggedIn}
              setShowMoreButtonVisible={false}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </ProtectedRoute>
          <Route path="/">
            <Header
              isLoggedIn={isLoggedIn}
              onSignIn={onSigninClick}
              onSignOut={signout}
              onSearch={handleSearch}
            />
            {isLoadingNews && <Preloader />}
            {wasSearch &&
              (fetchedCards.current.length === 0 ? (
                <NothingFound />
              ) : (
                <CardList
                  isLoggedIn={isLoggedIn}
                  showMoreButtonVisible={showMoreButtonVisible}
                  cards={renderedCards}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onShowMoreClick={onShowMoreClick}
                  onUnauthorizedClick={onUnauthorizedClick}
                  currentKeyword={currentKeyword}
                />
              ))}
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
          isWaiting={isWaiting}
        />
        <LoginPopup
          onLogin={login}
          onClose={closeAllPopups}
          isOpen={isLoginPopupOpen}
          onSignupClick={onSignupClick}
          isCommonError={LoginError}
          isWaiting={isWaiting}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
