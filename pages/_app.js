import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import NProgressContainer from "../components/nprogress-container";
import { createRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emitter from "../emitter";
import { AppProvider } from "./context";
const TEST_SITE_KEY = "6Lchg58eAAAAAD6eg58aXLCxZ5keolPP9uxcP8Op";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const recaptchaRef = createRef();

  const handleChange = (value) => {
    console.log("Captcha value:", value);
  };

  const asyncScriptOnLoad = () => {
    console.log("script loaded");
  };

  useEffect(async () => {
   
  }, []);

  return (
    <Provider store={store}>
      <AppProvider>
        <style jsx global>
          {`
            .scrollbar-primary {
              &::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                background-color: #232a32;
              }
              &::-webkit-scrollbar {
                width: 8px;
                background-color: #232a32;
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #8d83e0;
              }
            }
          `}
        </style>
        <Component {...pageProps} />
        <NProgressContainer />
      </AppProvider>
    </Provider>
  );
}
