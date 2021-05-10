import { useEffect } from "react";
import '../styles/globals.css';
import { AuthProvider } from '../firebase/contextAuth';
import store from '../redux/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {

  // Registers Service Worker if one exists on page load
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
