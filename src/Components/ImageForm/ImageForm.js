import React from 'react';
import './ImageForm.css';

const ImageForm = ({props, buttonclick}) => {
    return(
        <div>
            <p className ='f4 b'>
                {'Use the Smart Brain to detect faces in your pictures'}
            </p>
            <div className = 'container'>
                <div className ='form center pa4 br3 shadow-5'>
                <input className ='f4 pa2 w-70 center'
                type='text'
                placeholder='Enter a website address'
                onChange={props}
                />
                <button onClick={buttonclick} className ='w-30 grow f4 link ph3 pv2 dib white bg-dark-gray'>DETECT</button>
            </div>
        </div>
        </div>
    )
}

export default ImageForm;