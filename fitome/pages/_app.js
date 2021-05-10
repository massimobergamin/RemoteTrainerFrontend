import { useEffect } from "react";
import '../styles/globals.css';
import { AuthProvider } from '../firebase/contextAuth';
// import store from '../redux/store'
// import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {

  return (
    // <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    // </Provider>
  )
}

export default MyApp
