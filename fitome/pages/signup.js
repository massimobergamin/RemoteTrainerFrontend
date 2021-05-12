import React, {useState} from 'react';
import Link from 'next/link';
import {useAuth} from '../firebase/contextAuth'
import { useDispatch } from 'react-redux';
import { postUser, getUserById } from '../redux/trainer'

const SignUp = () => {
    const {signUp, currentUser} = useAuth();
    const dispatch = useDispatch();

    const initialState = {
        user_uid: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        username: "",
        type: ""
    }
    const [formState, setFormState] = useState(initialState);

    const createHandler = async () => {
        //check database for if username already exists
        try {
            await signUp(formState.email, formState.password);
            postUser(dispatch,formState);
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
                <input type="type"
                    placeholder="Type"
                    value={formState.type} 
                    onChange={(e)=>setFormState({...formState, type:e.target.value})}/>
                <button type="button" 
                    disabled={formState.password===""||formState.email===""||formState.firstName===""||formState.lastName===""||formState.username===""}
                    onClick={createHandler}>SIGN UP</button>
            </form>
            <p>Already have an account? <Link href="/"><span>Login.</span></Link></p>
        </div>
    )
}

export default SignUp
