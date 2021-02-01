import React, { useState } from 'react'
import './writereview.css'
import Select from 'react-select'

export default function WriteReview({ barId, user }) {

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ]

  const [overall, setOverall] = useState(0)
  const [food, setFood] = useState(0)
  const [service, setService] = useState(0)
  const [ambience, setAmbience] = useState(0)
  const [value, setValue] = useState(0)
  const [review, setReview] = useState('')
  const setReviewWrapper = (e) => {
    setReview(e.target.value)
  }

  const postReview = (e) => {
    e.preventDefault();

    if (typeof user === 'undefined' || user.id === null) {
      alert('Please login or signup to leave a review!')
    } else if (overall['value'] < 1 || food['value'] < 1 || service < 1 || ambience < 1 || value < 1 || review.length < 1) {
      alert('Please fill out all sections of the review to complete your posting.')
    } else {
      const postReviewHere = async () => {
        await fetch(`/api/users/${user.id}/reviews/bar/${barId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            overall: overall,
            food: food,
            service: service,
            ambience: ambience,
            value: value,
            review: review
          })
        })
      }
      postReviewHere()
  
      alert('Thank you for your review!')
    }
  }

  return (
    <div id='writereview_container'>
      <h3 id='writereview_title'>Write Your Review!</h3>
      <div id='writereview_dropdown-container'>
        <Select options={options} className='writereview_dropdown-container-element' placeholder={"Overall"} value={overall} onChange={setOverall}></Select>
        <Select options={options} className='writereview_dropdown-container-element' placeholder={"Food"} value={food} onChange={setFood}></Select>
        <Select options={options} className='writereview_dropdown-container-element' placeholder={"Service"} value={service} onChange={setService}></Select>
        <Select options={options} className='writereview_dropdown-container-element' placeholder={"Ambience"} value={ambience} onChange={setAmbience}></Select>
        <Select options={options} className='writereview_dropdown-container-element' placeholder={"Value"} value={value} onChange={setValue}></Select>
      </div>
      <textarea id='writereview_textarea' placeholder={'Write your review here'} value={review} onChange={setReviewWrapper}></textarea>
      <button id='writereview_post' onClick={postReview}>Post Your Review!</button>
    </div>
  )
}
