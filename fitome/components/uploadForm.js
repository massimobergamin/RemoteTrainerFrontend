
import React, {useState, useEffect} from 'react'
import useStorage from '../firebase/useStorage'

function UploadForm() {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const {url} = useStorage(file);
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

    // useEffect(() => {
    //     if (url) {
    //         setUrl({...state, url: url});
    //     }
    // }, [url])

    // useEffect(() => {
    //     if (file) {
    //         const {url} = useStorage(file);
    //         setUrlFile(url);
    //     }
    // },[file])

    return (
        <div>
            <form>
                <input type="file" onChange={handleChange}/>
                <div >
                {urlFile && <div>{urlFile}</div>}
                </div>
            </form>
        </div>
    )
}

export default UploadForm