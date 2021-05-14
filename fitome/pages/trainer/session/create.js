import React, {useState} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux';

function createSession() {
    const dispatch = useDispatch();
    const clients = useSelector((state)=> state.trainer.clients)

    return (
        <div>
        <div className="pageContainer">
            <h1>Create Training Session</h1>
            <form>
                <label for="client-choice">Training with:</label>
                <input list="client-list" name="client-choice"/>
                <datalist id="client-list">
                    {showClientList()}
                </datalist>
            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default createSession
