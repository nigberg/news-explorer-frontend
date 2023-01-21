import PopupWithForm from '../PopupWithForm/PopupWithForm'
import { useEffect } from 'react'
import useFormWithValidation from '../../utils/useFormWithValidation'

function RegisterPopup({
  onRegister,
  onSigninClick,
  onClose,
  isOpen,
  isCommonError,
  isWaiting
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
  } = useFormWithValidation({ username: '', email: '', password: '' })

  useEffect(() => {
    resetForm()
    setValues({ username: '', email: '', password: '' })
  }, [isOpen])

  const handleSubmit = () => {
    onRegister(values)
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Sign up"
      onSubmit={handleSubmit}
      onSigninClick={onSigninClick}
      isValid={isValid}
      isWaiting={isWaiting}
    >
      <div className="form__field">
        <label className="form__label">Email</label>
        <input
          className="form__input"
          placeholder="Enter email"
          required
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
        />
        <span
          className={`form__error email__error ${
            errors.email && 'form__error_visible'
          }`}
        >
          Invalid email
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Password</label>
        <input
          className="form__input"
          placeholder="Enter password"
          required
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          minLength="8"
        />
        <span
          className={`form__error password__error ${
            errors.password && 'form__error_visible'
          }`}
        >
          Short password
        </span>
      </div>
      <div className="form__field">
        <label className="form__label">Username</label>
        <input
          className="form__input"
          placeholder="Enter your username"
          required
          name="username"
          value={values.username}
          onChange={handleChange}
          type="text"
          minLength="3"
        />
        <span
          className={`form__error name__error ${
            errors.name && 'form__error_visible'
          }`}
        >
          Invalid username
        </span>
        <span
          className={`form__error form__error_common ${
            isCommonError && 'form__error_visible'
          }`}
        >
          This email is unavailable
        </span>
      </div>
    </PopupWithForm>
  )
}
export default RegisterPopup
