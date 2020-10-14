import React from 'react';

const Score = ({name, entrieamount}) => {
    return (
        <div>
         <div className ='white f3'>
             {`${name}, your current image score is`}
             </div>
         <div className ='white f1'>
             {entrieamount}
         </div>
</div>
    )
}

export default Score;