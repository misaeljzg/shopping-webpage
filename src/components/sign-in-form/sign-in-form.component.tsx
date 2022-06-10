import { useState, useContext, FormEvent, ChangeEvent } from 'react';

import { useDispatch } from 'react-redux';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, H2, ButtonsContainer } from './sign-in-form.styles';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
  email: '',
  password: ''
}



const SignInForm = () => {

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());

  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();

    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('Wrong password');
          break;
        case AuthErrorCodes.USER_DELETED:
          alert('Email does not exist');
          break;
        default:
          console.log(error);
          break;
      }
    }

  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };
  return (
    <SignInContainer>
      <H2>Already have an account?</H2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email} />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password} />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google sign in</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm;