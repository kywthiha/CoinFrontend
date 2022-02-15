import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import { useEffect } from 'react'

import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";



export default function App({ Component, pageProps }) {

  if (Cookies.get("anonymous_token") === undefined) {
    Cookies.set("anonymous_token", uuidv4());
  }

  const store = useStore(pageProps.initialReduxState)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}
