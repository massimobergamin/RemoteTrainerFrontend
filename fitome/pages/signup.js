import React, {useState} from 'react';
import Link from 'next/link';
import {useAuth} from '../firebase/contextAuth'

const SignUp = () => {
    
    const {signUp, currentUser} = useAuth();

    const initialState = {
        firstName: "",
        lastName: "",
        email:"",
        password:"",
        username:"",
    }
    const [formState, setFormState] = useState(initialState);

    const createHandler = async () => {
        //check database for if username already exists
        try {
            await signUp(formState.email, formState.password);
            console.log("Signing UP")
        } catch (err) {
            console.error(err)
        }
        //redux to create user to post to db
    }

    return (
        <div>
            <form>
                <input type="text" 
                    placeholder="First Name"
                    value={formState.firstName} 
                    onChange={(e)=>setFormState({...formState, firstName:e.target.value})}/>
                <input type="text" 
                    placeholder="Last Name"
                    value={formState.lastName} 
                    onChange={(e)=>setFormState({...formState, lastName:e.target.value})}/>
                <input type="text" 
                    placeholder="Username"
                    value={formState.username} 
                    onChange={(e)=>setFormState({...formState, username:e.target.value})}/>
                <input type="email"
                    placeholder="Email"
                    value={formState.email} 
                    onChange={(e)=>setFormState({...formState, email:e.target.value})}/>
                <input type="password"
                    placeholder="Password"
                    value={formState.password} 
                    onChange={(e)=>setFormState({...formState, password:e.target.value})}/>
                <button type="button" 
                    disabled={formState.password===""||formState.email===""||formState.firstName===""||formState.lastName===""||formState.username===""}
                    onClick={createHandler}>SIGN UP</button>
            </form>
            <p>Already have an account? <Link href="/"><span>Login.</span></Link></p>
        </div>
    )
}

export default SignUp
