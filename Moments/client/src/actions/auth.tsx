import * as api from "../api";
import { AUTH } from "../constants/actionType";

export const signin =
  (formData: object, navigate: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (formData: object, navigate: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
