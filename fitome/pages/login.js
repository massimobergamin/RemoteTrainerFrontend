import React, { useState } from 'react'
import { useAuth } from '../firebase/contextAuth'
import Link from 'next/link';

const login = () => {

  const {login, currentUser} = useAuth(); 
  const initialState = {
    email: '', 
    password: '',
  }

  const [formState, setFormState] = useState(initialState);

  const loginHandler = () => {
try {
        await login(formState.email, formState.password);
    } catch (err) {
        console.error(err)
    }
  };

  return (
    <div>
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
    </div>
  )
}

export default login
