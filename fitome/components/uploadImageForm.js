import { useState, useEffect } from 'react';
import useStorage from '../firebase/useStorage';

const UploadImageForm = ({ file, setURL }) => {
    const { url } = useStorage(file);

    useEffect(() => {
        if (url){
            setURL(url)
        }
      }, [url])

    return (
        <div></div>
    )
}

export default UploadImageForm;