import React from 'react'
import img1 from './ExamplePhotos/1.jpeg'
import img2 from './ExamplePhotos/2.jpeg'
import img3 from './ExamplePhotos/3.jpeg'
import img4 from './ExamplePhotos/4.jpeg'
import img5 from './ExamplePhotos/5.jpeg'

export default function Photo(props) {
  const imgList = [img1, img2, img3, img4, img5];

  const img = imgList[props.props - 1];
  let idType = 'shrink-other-imgs';
  if (props.props - 1 == 0) {
    idType = 'shrink-first-img';
  }

  return (
    <div id={idType}>
      <img src={img} alt='' id={idType}/>
    </div>
  )
}
