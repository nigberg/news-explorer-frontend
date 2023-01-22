import './PopupWithForm.css'
import { Link } from 'react-router-dom'
import Popup from '../Popup/Popup'

function PopupWithForm({
  onClose,
  isOpen,
  title,
  children,
  onSigninClick,
  onSignupClick,
  isValid,
  onSubmit,
  isWaiting
}) {
  const handleSigninClick = () => {
    onClose()
    onSigninClick()
  }
  const handleSignupClick = () => {
    onClose()
    onSignupClick()
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit()
  }
  return (
    <Popup title={title} onClose={onClose} isOpen={isOpen}>
      <form className="form" onSubmit={handleSubmit}>
        {children}
        <button
          type="submit"
          disabled={!isValid}
          className={`form__submit-button ${
            !isValid && 'form__submit-button_disabled'
          }`}
        >
          {isWaiting ? "Processing..." : title}
        </button>
      </form>
      <p className="form__sub">
        or &nbsp;
        <Link
          to="#"
          className="form__link"
          onClick={title === 'Sign in' ? handleSignupClick : handleSigninClick}
        >
          {title === 'Sign in' ? 'Sign up' : 'Sign in'}
        </Link>
      </p>
    </Popup>
  )
}
export default PopupWithForm
