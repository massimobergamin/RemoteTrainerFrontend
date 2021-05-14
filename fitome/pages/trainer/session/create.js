import React, {useState, useEffect} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux'
import { getSessions } from '../../../redux/trainer';

function create() {

    const { user } = useSelector(state => state.trainer);


    useEffect(()=> {
        dispatchEvent(getSessions("type", user.user_uid));
    });
    getSessions



    return (
        <div>
        <div className="pageContainer">
            <h1>Create Training Session</h1>
            <form>
            <label name="client"></label>
            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default create
