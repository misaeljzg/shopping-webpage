import { useState, useContext } from 'react';

import { useDispatch } from 'react-redux';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';

import {SignUpContainer, H2} from './sign-up-form.styles';

import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}



const SignUpForm = () => {

  const dispatch= useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password must match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encountered an error ', error);
    }


  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  };
  return (
    <SignUpContainer>
      <H2>Don't have an account?</H2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName} />
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
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword} />
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;