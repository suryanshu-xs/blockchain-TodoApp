import React from 'react'

const AppHeader = ({ headingText }) => {


    return <div className='tab-heading' >
        <span className='tab-heading_bold' > {headingText[0]}  </span>
        <span> {headingText[1]} </span>
    </div>


}


export default AppHeader