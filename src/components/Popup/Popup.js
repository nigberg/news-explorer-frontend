import './Popup.css'
import { useEffect } from 'react'

function Popup({isOpen, onClose, children, title}){
    const handleOverlayClick = (evt) => {
        if(evt.target === evt.currentTarget){
            onClose()
        }
    }
    const closeByEscape = (evt) => {
        if (evt.key === 'Escape'){
            onClose()
        }
    }

    useEffect(() =>{
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    return (
        <div onClick={handleOverlayClick} className={`popup ${isOpen && "popup_visible"}`}>
            <div  className="popup__content">
            <h2 className="popup__title">{title}</h2>
                <button type="button" className="popup__close-button" onClick={onClose} />
                {children}
            </div>
        </div>
    )
}
export default Popup