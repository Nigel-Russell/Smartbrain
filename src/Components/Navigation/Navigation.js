import React from 'react';

const Navigation = ({onroutechange, isSignedIn}) => {
        if(isSignedIn){
            return( 
            <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick ={()=> onroutechange('signin')} className='f4 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
            )
        } else {
            return(
                <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                  <p onClick ={()=> onroutechange('signin')} className='f4 link dim black underline pa3 pointer'>Sign In</p>
                  <p onClick ={()=> onroutechange('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
                </nav>
            )
        }
}

export default Navigation;
