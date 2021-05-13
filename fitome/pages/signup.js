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
        user_uid: '',
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        username: "",
        type: "",
        last_login: 0,
    }

    const inviteInitialState = {
        user_uid: '',
        invite_code: ''
    }
    const [inviteState, setInviteState] = useState(inviteInitialState)

    const [formState, setFormState] = useState(initialState);
    const { user } = useSelector(state => state.trainer);

    const createHandler = async () => {
       
        try {
          const fireBaseData = await signUp(formState.email, formState.password, formState.type);
          
          setFormState({...formState, user_uid:fireBaseData.user.uid, last_login: Date.now()})
          setInviteState({...inviteState, user_uid:fireBaseData.user.uid, invite_code: nanoid(5)})
        
          if (formState.type === 'trainer') {
    
              dispatch(postUser(formState));
              dispatch(postInviteCode(inviteState));
              router.push(`/trainer/invitecode`);
            } else {
              //add code for client here
            }

          
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <form>
                <input type="text" 
                    placeholder="First Name"
                    value={formState.firstName} 
                    onChange={(e)=>setFormState({...formState, first_name:e.target.value})}/>
                <input type="text" 
                    placeholder="Last Name"
                    value={formState.lastName} 
                    onChange={(e)=>setFormState({...formState, last_name:e.target.value})}/>
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
            <p>Already have an account? <Link href="/"><a><span>Login.</span></a></Link></p>
        </div>
    )
}

export default SignUp
