import React, {useState} from 'react';
import Link from 'next/link';
import {useAuth} from '../firebase/contextAuth'
import { useDispatch, useSelector } from 'react-redux';
import { postUser, postInviteCode } from '../redux/trainer'
import { useRouter } from 'next/router';
import { nanoid } from '@reduxjs/toolkit';

const SignUp = () => {
    const {signUp, currentUser} = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    const initialState = {
        user_uid: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        username: "",
        type: "",
        last_login: 0,
    }

    const inviteInitialState = {
        user_uid: "",
        invite_code: ""
    }

    const [inviteState, setInviteState] = useState(inviteInitialState)
    const [formState, setFormState] = useState(initialState);
    const [error,setError] = useState("");
    const { user, invite_code } = useSelector(state => state.trainer);
    console.log("INVITE", invite_code)
    function titleCase(name){
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    const createHandler = async () => {
        const error = document.getElementById("error");
        try {
            let lowerType = formState.type.toLowerCase();
            let firstName = titleCase(formState.first_name);
            let lastName = titleCase(formState.last_name);
            const fireBaseData = await signUp(formState.email, formState.password, lowerType);
            setError("");
            error.style.display="none";
            if (formState.type === 'Trainer') {
                await dispatch(postUser({...formState, type: lowerType, first_name: firstName, last_name: lastName, user_uid:fireBaseData.user.uid, last_login: Date.now()}))
                await dispatch(postInviteCode({...inviteState, user_uid:fireBaseData.user.uid, invite_code: nanoid(5).toUpperCase()}));
                router.push(`/trainer/invitecode`);
            } else if (formState.type === 'Client') {
              await dispatch(postUser({...formState, type: lowerType, first_name: firstName, last_name: lastName, user_uid:fireBaseData.user.uid, last_login: Date.now()}))
              router.push(`/client/invitecode`);
            }
        } catch (err) {
            setError(err.message);
            error.style.display="block";
            setFormState(initialState);

        }
    }

    return (
        <div className="initial_background">
            <img className="initial_decor" src="/decor_background.png"/>
            <img className="initial_wave" src="/wave.png"/>
            <div className="signup_wrapper">
            <img className="initial_logo" src="/fitome_orange.png"/>
            <div className="signup_error" id="error">{error}</div>
            <form className="signup_form">
                <label className="signup_input" htmlFor="firstName">First Name:</label>
                <input type="text"
                    // placeholder="First Name"
                    name="firstName"
                    value={formState.firstName}
                    onChange={(e)=>setFormState({...formState, first_name:e.target.value})}/>
                <label className="signup_input" htmlFor="lastName">Last Name:</label>
                <input type="text"
                    name="lastName"
                    // placeholder="Last Name"
                    value={formState.lastName}
                    onChange={(e)=>setFormState({...formState, last_name:e.target.value})}/>
                <label className="signup_input" htmlFor="username">Account Username:</label>
                <input type="text"
                    name="username"
                    // placeholder="Username"
                    value={formState.username}
                    onChange={(e)=>setFormState({...formState, username:e.target.value})}/>
                <label className="signup_input" htmlFor="email">Email:</label>
                <input type="email"
                    name="email"
                    // placeholder="Email"
                    value={formState.email}
                    onChange={(e)=>setFormState({...formState, email:e.target.value})}/>
                <label className="signup_input" htmlFor="password">Password:</label>
                <input type="password"
                    name="password"
                    // placeholder="Password"
                    value={formState.password}
                    onChange={(e)=>setFormState({...formState, password:e.target.value})}/>
                <label className="signup_input" htmlFor="type">Select an Account Type:</label>
                <input list="accountType"
                    id="listoftype"
                    name="listoftype"
                    // placeholder="Account Type"
                    onChange={(e)=>setFormState({...formState, type:e.target.value})}/>
                <datalist id="accountType">
                    <option value="Client"></option>
                    <option value="Trainer"></option>
                </datalist>
            </form>
            <button type="button" className="signup_button"
                disabled={formState.password===""||formState.email===""||formState.first_name===""||formState.last_name===""||formState.username===""||formState.type===""}
                onClick={createHandler}>SIGN UP</button>
            <p className="signup_account" >Already have an account? <Link href="/"><a><span className="signup_account_span">Login.</span></a></Link></p>
            </div>
        </div>
    )
}

export default SignUp
