import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Nav from '../Nav/Nav'
import './SavedNewsHeader.css'

function SavedNewsHeader({ isLoggedIn, onSignOut }) {
  const currentUser = useContext(CurrentUserContext)

  const getKeywordsString = () => {
    const keywords = currentUser.savedCards.map((card) => card.keyword)
    const uniqueKeywords = [...new Set(keywords)]
    const keywordsCounted = {}

    uniqueKeywords.forEach((keyword) => {
      let count = 0
      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] === keyword) {
          count++
        }
      }
      keywordsCounted[keyword] = count
    })

    let maxCount = 0
    let secondMaxCount = 0
    let firstKeyword = ''
    let secondKeyword = ''

    if(uniqueKeywords.length > 1){
      // find the 1-st keyword
      Object.keys(keywordsCounted).forEach((key) => {
        if(keywordsCounted[key] > maxCount){
          maxCount = keywordsCounted[key]
          firstKeyword = key
        }
      })
      // find the 2-nd keyword
      for(let key of Object.keys(keywordsCounted)){
        if(key === firstKeyword){
          continue
        }
        if(keywordsCounted[key] > secondMaxCount){
          secondMaxCount = keywordsCounted[key]
          secondKeyword = key
        }
      }
    }
    if(uniqueKeywords.length === 3){
      uniqueKeywords[2] = uniqueKeywords.filter((keyword) => (keyword !== firstKeyword && keyword !== secondKeyword))[0]
    }

    if (firstKeyword) uniqueKeywords[0] = firstKeyword
    if (secondKeyword) uniqueKeywords[1] = secondKeyword

    return uniqueKeywords.length <= 3
      ? uniqueKeywords.join(', ')
      : firstKeyword +
          ', ' +
          secondKeyword +
          ', and ' +
          (uniqueKeywords.length - 2) +
          ' other'
  }

  return (
    <header className="saved-news-header">
      <Nav isLoggedIn={isLoggedIn} onSignOut={onSignOut} />
      <div className="saved-news-header__container">
        <h1 className="saved-news-header__title">Saved articles</h1>
        <p className="saved-news-header__text">
          {currentUser.name}, you have {currentUser.savedCards.length} saved
          articles
        </p>
        <p className="saved-news-header__keywords">
          By keywords: &nbsp;
          <span className="saved-news-header__highlited-keywords">
            {getKeywordsString()}
          </span>
        </p>
      </div>
    </header>
  )
}
export default SavedNewsHeader
