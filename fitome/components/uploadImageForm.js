import React, { useState, useEffect } from 'react';
import useStorage from '../firebase/useStorage';

const UploadImageForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const { url, progress } = useStorage(file);
    const types = ['image/png', 'image/jpeg'];

     const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            console.log(selected.type)
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please select an image file(png or jpeg)');
        }
    }

    return (
        <div>
            <form>
                <input type="file" onChange={handleChange}/>
                <div >
                {url && <img src={url}/>}
                {error && <div>{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default UploadImageForm;