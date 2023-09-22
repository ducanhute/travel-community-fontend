import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // Login

        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // Login

        history.push("/");
    } catch (error) {
        console.log(error);
    }
};
