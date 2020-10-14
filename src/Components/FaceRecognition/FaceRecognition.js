import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({props, box}) => {
    return(
        <div className='container'>
            <div className='absolute mt2'>
            <img id='inputimage'alt='' src={props} width='400px' height='auto'/>
            <div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;