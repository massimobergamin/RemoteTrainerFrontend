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
    const { user, invite_code } = useSelector(state => state.trainer);

    function titleCase(name){
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    const createHandler = async () => {
        try {
            const fireBaseData = await signUp(formState.email, formState.password, formState.type);
            let lowerType = formState.type.toLowerCase();
            let firstName = titleCase(formState.first_name);
            let lastName = titleCase(formState.last_name);
            if (formState.type === 'Trainer') {
                await dispatch(postUser({...formState, type: lowerType, first_name: firstName, last_name: lastName, user_uid:fireBaseData.user.uid, last_login: Date.now()}))
                await dispatch(postInviteCode({...inviteState, user_uid:fireBaseData.user.uid, invite_code: nanoid(5).toUpperCase()}));
                router.push(`/trainer/invitecode`);
            } else {
              await dispatch(postUser({...formState, type: lowerType, first_name: firstName, last_name: lastName, user_uid:fireBaseData.user.uid, last_login: Date.now()}))
              router.push(`/client/trainercode`);
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <form>
                <label className="sessionCreate_field" htmlFor="firstName">First Name:</label>
                <input type="text" 
                    placeholder="First Name"
                    name="firstName"
                    value={formState.firstName} 
                    onChange={(e)=>setFormState({...formState, first_name:e.target.value})}/>
                <label className="sessionCreate_field" htmlFor="lastName">Last Name:</label>
                <input type="text" 
                    name="lastName"
                    placeholder="Last Name"
                    value={formState.lastName} 
                    onChange={(e)=>setFormState({...formState, last_name:e.target.value})}/>
                <label className="sessionCreate_field" htmlFor="username">Account Username:</label>
                <input type="text" 
                    name="username"
                    placeholder="Username"
                    value={formState.username} 
                    onChange={(e)=>setFormState({...formState, username:e.target.value})}/>
                <label className="sessionCreate_field" htmlFor="email">Email:</label>
                <input type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email} 
                    onChange={(e)=>setFormState({...formState, email:e.target.value})}/>
                <label className="sessionCreate_field" htmlFor="password">Password:</label>
                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password} 
                    onChange={(e)=>setFormState({...formState, password:e.target.value})}/>
                <label className="sessionCreate_field" htmlFor="type">Select an Account Type:</label>
                <input list="accountType"
                    id="listoftype"
                    name="listoftype"
                    placeholder="Account Type"
                    onChange={(e)=>setFormState({...formState, type:e.target.value})}/>
                <datalist id="accountType">
                    <option value="Client"></option>
                    <option value="Trainer"></option>
                </datalist>
                <button type="button" 
                    disabled={formState.password===""||formState.email===""||formState.first_name===""||formState.last_name===""||formState.username===""||formState.type===""}
                    onClick={createHandler}>SIGN UP</button>
            </form>
            <p>Already have an account? <Link href="/"><a><span>Login.</span></a></Link></p>
        </div>
    )
}

export default SignUp
