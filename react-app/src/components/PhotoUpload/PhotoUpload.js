import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PhotoUpload.css'

const PhotoUpload = ({ setter, value, defaultValue }) => {
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState(defaultValue)
    const [linkOpen, setLinkOpen] = useState(false)
    const [linkText, setLinkText] = useState('')
    const writeProperty = (e) => {
        setLinkText(e.target.value)
    }
    const openLink = (e) => {
        e.preventDefault()
        setLinkOpen(!linkOpen)
    }
    const imageErrorCheck = (e) => {
        e.target.src = 'http://simpleicon.com/wp-content/uploads/user1.png'
    }

    const updateImage = (e) => {
        e.preventDefault()
        setter(linkText)
        setCurrentImage(linkText)
        setLinkOpen(false)
    }

    const cancelChanges = (e) => {
        e.preventDefault()
        setter(defaultValue)
        setCurrentImage(defaultValue)
    }
    return (
        <div className='modal-form-div'>
            <label>Profile Image</label>
            <img className='profile-img-preview' src={currentImage} onError={imageErrorCheck} />
            <div className='photo-upload-buttons'>
                <button onClick={openLink}>Link</button>
                <button>Upload</button>
                <button onClick={cancelChanges}>Cancel</button>
            </div>
            {linkOpen &&
                <>
                    <input
                        type="text"
                        name="profileImg"
                        onChange={writeProperty}
                        value={linkText}
                        placeholder='URL'
                    ></input>
                    <button onClick={updateImage}>Link Image</button>
                </>
            }
        </div>
    );
}

export default PhotoUpload;
