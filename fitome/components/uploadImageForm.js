import React, { useState, useEffect } from 'react';
import useStorage from '../firebase/useStorage';

<<<<<<< HEAD
const UploadImageForm = ({ setPhoto }) => {
=======
const UploadImageForm = ({setPhoto}) => {
>>>>>>> main

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const { url, progress } = useStorage(file);
    const types = ['image/png', 'image/jpeg'];

     const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please select an image file(png or jpeg)');
        }
    }

    useEffect(() => {
        file && setPhoto('uploading');
        url && setPhoto(url);
      }, [file, url])

    return (
        <div>
            <form>
                <input type="file" accept="image/*" onChange={handleChange}/>
                <div >
<<<<<<< HEAD
                {(file && !url) && <h5>Uploading {file.name}...</h5>}
                {url && <img src={url}/>}
=======
                {url && <img className="photoPreview"src={url}/>}
>>>>>>> main
                {error && <div>{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default UploadImageForm;