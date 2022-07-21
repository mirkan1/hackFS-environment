
import React from 'react';


function MainArea({child=<></>}) {
    return ( <div className='bg-gray-100 flex-auto flex justify-center items-center' >{child}</div> );
}

export default MainArea;