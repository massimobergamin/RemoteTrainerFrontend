import React, {useEffect, useState} from 'react';
import {projectStorage} from './config.js'

const useStorage = (file) => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        //references
        
        if (file) {
            const storageRef = projectStorage.ref();
            const imageRef = storageRef.child(`${Date.now()}.${file.name}`);
        imageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await imageRef.getDownloadURL();
            setUrl(url);
        })
    }
    },[file]);

    return {progress, url, error};

}

export default useStorage;