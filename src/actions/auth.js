import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // Login
        const { data } = await api.signin(formData);

        dispatch({ type: AUTH, data });

        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // signup
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data });

        history.push("/");
    } catch (error) {
        console.log(error);
    }
};
