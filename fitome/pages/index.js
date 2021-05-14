import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useAuth } from '../firebase/contextAuth';
import Link from 'next/link';
import UploadImageForm from '../components/uploadImageForm';
import UploadVideoForm from '../components/uploadVideoForm';
import { useDispatch } from 'react-redux';
import { getUserById } from '../redux/trainer';
import { getUser } from '../redux/client';
import { useRouter } from 'next/router';

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const initialState = {
    email: '',
    password: '',
  };
  const [formState, setFormState] = useState(initialState);

  const loginHandler = async () => {
    try {
      let userInfo = await login(formState.email, formState.password);
      
      if (userInfo.user.displayName === 'trainer') {
        dispatch(getUserById(userInfo.user.uid));
        router.push('/trainer');
      } else if (userInfo.user.displayName === 'client') {
        dispatch(getUser(userInfo.user.uid));
        router.push('/client');
      }
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fitome</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB"/>
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
      </Head>
      <main className={styles.main}>
        <UploadImageForm/>
        <UploadVideoForm/>
        <form>
          <input type="email"
            placeholder="Email"
            value={formState.email}
            required
            onChange={(e) => setFormState({...formState, email: e.target.value})}
          />
          <input type="password"
          placeholder="Password"
          value={formState.password}
          required
          onChange={(e) => setFormState({...formState, password: e.target.value})}
          />
          <button type="button" onClick={loginHandler}>LOGIN</button>
        </form>
        <p>Don't have an account? <Link href="/signup"><a><span>Sign up.</span></a></Link></p>
        
      </main>
    </div>
  )
}
