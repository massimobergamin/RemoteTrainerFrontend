import React, {useState} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'

function create() {


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
