import Popup from '../Popup/Popup'
import { Link } from 'react-router-dom'
import './SuccessPopup.css'

function SuccessPopup({ isOpen, onClose, onSigninClick }) {
  const handleSigninClick = () => {
    onClose()
    onSigninClick()
  }
  return (
    <Popup
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Link className="success-popup__link" onClick={handleSigninClick}>
        Sign in
      </Link>
    </Popup>
  )
}
export default SuccessPopup
