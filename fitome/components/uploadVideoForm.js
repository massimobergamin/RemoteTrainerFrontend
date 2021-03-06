import { useState, useEffect } from 'react';
import useStorage from '../firebase/useStorage';

function UploadVideoForm({ setMedia }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { url } = useStorage(file);
    const types = ['video/mp4'];

     const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please select a video file (mp4)');
        }
    }

    useEffect(() => {
      file && setMedia('uploading');
      url && setMedia(url);
    }, [file, url])

    return (
        <div>
            <form>
                <input style={{height: "1.82rem", width: "220px", padding: "2px 2px"}} type="file" onChange={handleChange}/>
                <div >
                {(file && !url) && <h5>Uploading {file.name}...</h5>}
                {url &&
                <video id="Exercise_Video" controls muted loop={true}>
                    <source src={url} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video>}
                {error && <div>{error}</div>}
                </div>
            </form>
        </div>
    )
}

export default UploadVideoForm;