import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PhotoUpload.css'
import { setUser } from '../../store/session'

const PhotoUpload = ({ setter, value, defaultValue, profilePage = false }) => {
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState(defaultValue)
    const [linkOpen, setLinkOpen] = useState(false)
    const [linkText, setLinkText] = useState('')
    const [file, setFile] = useState('')
    const user = useSelector((state) => state.session.user)

    const upload = async (file) => {
        let response = await fetch(`/api/users/photos`, {
            method: "POST",
            body: file
        })

        response = await response.json()
        setter(response.link)
        setCurrentImage(response.link)

        if (profilePage && user) {
            let res = await fetch(`/api/users/profileImage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id, profileImage: response.link })
            })
            let data = await res.json()
            dispatch(setUser(data))
        }
    }

    const attachFile = (e) => {
        let formData = new FormData();
        formData.append("photo", e.target.files[0], e.target.files[0].name);
        setFile(formData)
        upload(formData)
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

    const updateImage = async (e) => {
        e.preventDefault()
        setter(linkText)
        if (profilePage && user) {
            let res = await fetch(`/api/users/profileImage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id, profileImage: linkText })
            })
            let data = await res.json()
            dispatch(setUser(data))
        }
        setCurrentImage(linkText)
        setLinkOpen(false)
    }

    const cancelChanges = async (e) => {
        e.preventDefault()
        setter(defaultValue)
        setCurrentImage(defaultValue)
        if (profilePage && user) {
            let res = await fetch(`/api/users/profileImage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id, profileImage: defaultValue })
            })
            let data = await res.json()
            dispatch(setUser(data))
        }
    }

    return (
        <div className='photo-upload-wrapper'>
            <img className='profile-img-preview' src={currentImage} onError={imageErrorCheck} />
            <div className='photo-upload-buttons'>
                <button className={linkOpen ? 'photo-upload-button selected' : 'photo-upload-button'} onClick={openLink}><i className="fas fa-paperclip"></i></button>
                <button className='photo-upload-button' onClick={openUpload}>
                    <i className="fas fa-arrow-up"></i>
                </button>
                <button className={currentImage !== defaultValue ? 'photo-upload-button' : 'photo-upload-button disabled'} onClick={cancelChanges}><i className="fas fa-ban"></i></button>
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
