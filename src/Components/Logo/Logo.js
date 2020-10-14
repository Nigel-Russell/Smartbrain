import React from 'react';
import Tilt from 'react-tilt';
import image from './brainlogo.png'; 


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-4" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner"><img alt='logo' src={image}></img></div>
            </Tilt>
        </div>
    );
};

export default Logo;