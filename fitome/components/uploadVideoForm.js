
import React, {useState, useEffect} from 'react'
import useStorage from '../firebase/useStorage'

function UploadVideoForm() {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const {url, progress} = useStorage(file);
    const types = ['video/mp4'];

     const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            console.log(selected.type)
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please select a video file(mp4)');
        }
    }
    
    return (
        <div>
            <form>
                <input type="file" onChange={handleChange}/>
                <div >
                {url && 
                <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                    <source src={url} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video> }
                {error && <div>{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default UploadVideoForm