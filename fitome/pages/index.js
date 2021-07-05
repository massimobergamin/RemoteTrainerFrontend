import Head from 'next/head';
import React, { useState } from 'react';
import { useAuth } from '../firebase/contextAuth';
import Link from 'next/link';
import UploadImageForm from '../components/uploadImageForm';
import UploadVideoForm from '../components/uploadVideoForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../redux/trainer';
import { getUser } from '../redux/client';
import { useRouter } from 'next/router';
import Loader from '../components/loader';


export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const initialState = {
    email: '',
    password: '',
  };

  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, trainerInfo } = useSelector(state => state.client);

    const loginHandler = async () => {
      try {
      setLoading(true);
      let userInfo = await login(formState.email, formState.password);
      setError("");
      if (userInfo.user.displayName === 'trainer') {
        await dispatch(getUserById(userInfo.user.uid)).then(setLoading(false));
        router.push('/session');
      } else if (userInfo.user.displayName === 'client') {
          await dispatch(getUser(userInfo.user.uid)).then(() => {
          if (trainerInfo) {
            setLoading(false);
            router.push('/client/plan');
          } else {
            setLoading(false);
            router.push('/client/invitecode');
          }});
        };
     } catch (err) {
       setLoading(false);
       const error = document.getElementById("error");
       console.log(err);
       setError(err.message);
       setFormState(initialState);
       error.style.display="block";
     }
    }

    if (loading) return <Loader/>;

      return (
        <div>
          <Head>
            <title>Fitome</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#317EFB"/>
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
          </Head>
          <main className="initial_background">
            <img className="initial_decor" src="/decor_background.png"/>
            <img className="initial_wave" src="/wave.png"/>
            <div className="signup_wrapper">
            <img className="initial_logo" src="/fitome_orange.png"/>
            <div className="signup_error" id="error">{error}</div>
            <form className="signup_form login_form">
              <label className="signup_input" htmlFor="email">Email:</label>
              <input type="email"
                name="email"
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
              <label className="signup_input" htmlFor="password">Password:</label>
              <input type="password"
              name="password"
              value={formState.password}
              onChange={(e) => setFormState({...formState, password: e.target.value})}
              />
            </form>
              <button type="button" 
              className="signup_button"
              disabled={formState.password===""||formState.email===""}
              onClick={loginHandler}>LOGIN</button>
            <p className="signup_account">Don't have an account? <Link href="/signup"><a><span className="signup_account_span">Sign up.</span></a></Link></p>
          </div>
          </main>
        </div>
      )
  }
