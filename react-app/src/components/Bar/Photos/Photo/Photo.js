import React from 'react'

export default function Photo({ props, firstImg }) {

  let idType = 'shrink-other-imgs';
  if (firstImg) {
    idType = 'shrink-first-img';
  }

  return (
    <div id={idType}>
      <img src={ props !== null && typeof props !== 'undefined' ? props.photoUrl : null} alt='' id={idType}/>
    </div>
  )
}
