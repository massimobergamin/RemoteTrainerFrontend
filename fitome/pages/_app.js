import { useEffect } from "react";
import '../styles/globals.css';
import { AuthProvider } from '../firebase/contextAuth';
import store from '../redux/store'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
