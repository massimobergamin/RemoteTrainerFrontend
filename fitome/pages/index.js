import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useAuth } from '../firebase/contextAuth'
import Link from 'next/link';

export default function Home() {

  const {login, currentUser} = useAuth(); 
  const initialState = {
    email: '', 
    password: '',
  }

  const [formState, setFormState] = useState(initialState);

  const loginHandler = async () => {
    try {
        await login(formState.email, formState.password);
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
          onChange={(e) => setFormState({...formState, password: e.target.password})}
          />
          <button type="button" onClick={loginHandler}>LOGIN</button>
        </form>
        <p>Don't have an account? <Link href="/signup"><span>Sign up.</span></Link></p>
      </main>
    </div>
  )
}
