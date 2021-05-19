import React, { useState, useEffect } from 'react';
import useStorage from '../firebase/useStorage';

const UploadImageForm = ({ file, setURL }) => {

    // const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { url, progress } = useStorage(file);
    // const types = ['image/png', 'image/jpeg'];

    //  const handleChange = (e) => {
    //     let selected = e.target.files[0];
    //     if (selected && types.includes(selected.type)) {
    //         setFile(selected);
    //         setError(null);
    //     } else {
    //         setFile(null);
    //         setError('Please select an image file(png or jpeg)');
    //     }
    // }

    useEffect(() => {
        if (url){
            setURL(url)
        }
        else setURL("uploading")
      }, [url])

    return (
        <div>
            {/* <form>
                <input type="file" accept="image/*" onChange={handleChange}/>
                <div>
                {(file && !url) && <h5>Uploading {file.name}...</h5>}
                {url && <img className="profilePic" src={url}/>}
                {error && <div>{error}</div>}
                </div>
            </form> */}
        </div>
    )
}

export default UploadImageForm;