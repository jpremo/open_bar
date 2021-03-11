import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setCreateBarModal } from "../../../store/modal"
import "./index.css"




const CreateBar = () => {
    // const { userId } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [barSeats, setBarSeats] = useState(0)
    const [bannerImg, setBannerImg] = useState("")
    // const [ownerId, setOwnerId] = useState()
    const [errors, setErrors] = useState([])

    const userId = useSelector(state => state.session.user.id)


    useEffect(() => {
        const errors = [];
        if (!name.length) {
            errors.push("Must input a name")
        }
        if (!phone.length) {
            errors.push("Must input a phone number")
        }
        if (!street.length) {
            errors.push("Must input a phone street")
        }
        if (!state.length) {
            errors.push("Must input a phone state")
        }
        if (zipcode === 0) {
            errors.push("Must input a zipcode ")
        }
        setErrors(errors);
    }, [name, phone, street, state, zipcode])



    const onSubmit = async e => {
        e.preventDefault();


        const formInfo = {
            name,
            description,
            phoneNumber: phone,
            street,
            state,
            zipcode,
            barSeats,
            dayAndTime: JSON.parse("{\"monday\":\"14-2\",\"tuesday\":\"16-1\",\"wednesday\":\"12-1\",\"thursday\":\"15-1\",\"friday\":\"16-2\",\"saturday\":\"10-3\",\"sunday\":\"13-1\"}"),
            bannerImg,
            ownerId: userId
        }
        const tt = window.tt


        let loc = await tt.services.fuzzySearch({
            key: 'g0ZS3ih3olA15iG2cSglfY1YrEJO8DKR',
            query: `${formInfo.street} ${formInfo.state} ${formInfo.zipcode}`
        }).go()

        formInfo.longitude = loc.results[0].position.lng
        formInfo.latitude = loc.results[0].position.lat

        //defaulting to new york
        // coordString = '-73.93,40.73'

        let newBar = await fetch("/api/bars/create", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })
        newBar = await newBar.json()
        history.push(`/bars/${newBar.id}`)



        setName("")
        setDescription("")
        setPhone("")
        setStreet("")
        setState("")
        setZipcode(0)
    }

    const cancel = (e) => {
        dispatch(setCreateBarModal(false))
    }



    return (

        <div id="create-bar-container">
            <form id="new-bar-form" onSubmit={onSubmit}>
                <h2>Add Your Bar info</h2>
                <ul id="errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <input type="text" name="name" placeholder="Bar or Restaurant Name"
                    onChange={(e) => setName(e.target.value)} value={name} />
                <textarea type="text" name="description" placeholder="Tell the world about your bar"
                    onChange={(e) => setDescription(e.target.value)} value={description} />
                <input type="text" name="phone-number" placeholder="phone number"
                    onChange={(e) => setPhone(e.target.value)} value={phone} />
                <input type="text" name="street" placeholder="street"
                    onChange={(e) => setStreet(e.target.value)} value={street} />
                <input type="text" name="state" placeholder="state"
                    onChange={(e) => setState(e.target.value)} value={state} />
                <input type="text" name="zipcode" placeholder="zipcode"
                    onChange={(e) => setZipcode(e.target.value)} value={zipcode} />
                <label htmlFor="bar-seats">How many bar seats available?</label>
                <input type="number" name="bar-seats"
                    onChange={(e) => setBarSeats(e.target.value)} value={barSeats} />
                <input type="text" name="bannerImg" placeholder="Input banner image url"
                    onChange={(e) => setBannerImg(e.target.value)} value={bannerImg} />
                <button type="submit">Create bar</button>
                <div className='modal-link modal-button' onClick={cancel}> Close</div>
            </form>
        </div>

    )
}

export default CreateBar