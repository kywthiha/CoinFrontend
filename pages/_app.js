import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}
