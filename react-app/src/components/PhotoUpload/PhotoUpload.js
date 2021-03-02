import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PhotoUpload.css'

const PhotoUpload = ({ setter, value, defaultValue }) => {
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState(defaultValue)
    const [linkOpen, setLinkOpen] = useState(false)
    const [linkText, setLinkText] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        if(file) {
            //send to AWS
            const upload = async () => {
                let response = await fetch(`/api/users/photos`, {
                    method: "POST",
                    header: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ file })
                })

                response = await response.json()
                setter(response.link)
                setCurrentImage(response.link)
            }
            upload()
        }
    }, [file])

    const attachFile = (e) => {
        setFile(e.target.files[0])
    }

    const openUpload = (e) => {
        e.preventDefault()
        const uploader = document.createElement('input');
        uploader.type = 'file';
        uploader.onchange = attachFile;
        uploader.click()
    }

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
        <div className='photo-upload-wrapper'>
            <img className='profile-img-preview' src={currentImage} onError={imageErrorCheck} />
            <div className='photo-upload-buttons'>
                <button className={linkOpen ? 'photo-upload-button selected' : 'photo-upload-button'} onClick={openLink}><i class="fas fa-paperclip"></i></button>
                <button className='photo-upload-button' onClick={openUpload}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <input type="file" onChange={attachFile} />
                <button className={currentImage !== defaultValue ? 'photo-upload-button' : 'photo-upload-button disabled'} onClick={cancelChanges}><i class="fas fa-ban"></i></button>
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
                <button className='photo-upload-button' onClick={updateImage}>Change</button>
                </>
            }
        </div>
    );
}

export default PhotoUpload;
