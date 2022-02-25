import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  createRef,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getToken, handleError } from "../helper";

const AppContext = React.createContext();
const TEST_SITE_KEY = "6Lchg58eAAAAAD6eg58aXLCxZ5keolPP9uxcP8Op";

const initialState = {
  recaptchaToken: null,
};

const reducer = (state, action) => {
  if (action.type === "ADD_TOKEN") {
    return { ...state, recaptchaToken: action.payload };
  }
  if (action.type === "CLEAR_TOKEN") {
    return { ...state, recaptchaToken: null };
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const recaptchaRef = createRef();

  const handleChange = (value) => {
    dispatch({ type: "ADD_TOKEN", payload: value });
  };

  const asyncScriptOnLoad = () => {
    console.log("script loaded");
  };

  const recaptchaRefExecuteAsync = async () => {
    if (state.recaptchaToken) {
      return state.recaptchaToken;
    }
    const token = await recaptchaRef.current.executeAsync();
    dispatch({ type: "ADD_TOKEN", payload: token });
    return token;
  };

  const handleExpired = () => {
    dispatch({ type: "CLEAR_TOKEN" });
  };

  useEffect(() => {
    handleExpired();
  }, []);

  return (
    <AppContext.Provider
      value={{
        recaptchaRefExecuteAsync,
      }}
    >
      {children}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={TEST_SITE_KEY}
        size="invisible"
        onChange={handleChange}
        onExpired={handleExpired}
        asyncScriptOnLoad={asyncScriptOnLoad}
      />
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
