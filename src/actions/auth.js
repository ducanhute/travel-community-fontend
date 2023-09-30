import { toast } from 'react-toastify';
import * as api from '../api';
import { AUTH } from '../constants/actionTypes';
export const signIn = (formData, history) => async (dispatch) => {
  try {
    // Login
    const { data } = await api.signin(formData);
    toast.success('Sign in successfully!');
    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // signup
    const { data } = await api.signup(formData);
    toast.success('Account has been successfully created!');
    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
