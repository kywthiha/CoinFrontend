import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import NProgressContainer from "../components/nprogress-container";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
