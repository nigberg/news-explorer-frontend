import PopupWithForm from '../PopupWithForm/PopupWithForm'
import { useEffect } from 'react'
import useFormWithValidation from '../../utils/useFormWithValidation'

function LoginPopup({
  onLogin,
  onSignupClick,
  onClose,
  isOpen,
  isCommonError,
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
  } = useFormWithValidation({ email: '', password: '' })

  useEffect(() => {
    resetForm()
    setValues({ email: '', password: '' })
  }, [isOpen])

  const handleSubmit = () => {
    onLogin(values)
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Sign in"
      onSubmit={handleSubmit}
      onSignupClick={onSignupClick}
      isValid={isValid}
    >
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
      <span className={`form__error email__error ${errors.email && 'form__error_visible'}`}>Invalid email</span>
      <label className="form__label">Password</label>
      <input
        className="form__input"
        placeholder="Enter password"
        required
        name="password"
        value={values.password}
        onChange={handleChange}
        type="password"
        minLength='8'
      />
      <span className={`form__error password__error ${errors.password && 'form__error_visible'}`}>Short password</span>
      <span className={`form__error form__error_common ${isCommonError && 'form__error_visible'}`}>Incorrect email or password</span>
    </PopupWithForm>
  )
}
export default LoginPopup
