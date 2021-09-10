import React from 'react'

const Trash = ({width, height, className, eventHandler}) => {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        width={width} 
        height={height}
        onClick={eventHandler}
        viewBox="0 0 8.361 9.555">
            <path id="trash-alt-regular" className="cls-1" d="M5,7.763h.448a.224.224,0,0,0,.224-.224V3.508a.224.224,0,0,0-.224-.224H5a.224.224,0,0,0-.224.224V7.539A.224.224,0,0,0,5,7.763Zm3.061-6.27H6.524L5.889.435A.9.9,0,0,0,5.121,0H3.24a.9.9,0,0,0-.768.435L1.837,1.493H.3a.3.3,0,0,0-.3.3v.3a.3.3,0,0,0,.3.3H.6v6.27a.9.9,0,0,0,.9.9H6.868a.9.9,0,0,0,.9-.9V2.389h.3a.3.3,0,0,0,.3-.3v-.3A.3.3,0,0,0,8.062,1.493ZM3.207.95A.112.112,0,0,1,3.3.9H5.057a.112.112,0,0,1,.1.054l.326.543h-2.6ZM6.868,8.659H1.493V2.389H6.868Zm-3.956-.9h.448a.224.224,0,0,0,.224-.224V3.508a.224.224,0,0,0-.224-.224H2.911a.224.224,0,0,0-.224.224V7.539A.224.224,0,0,0,2.911,7.763Z"/>
        </svg>

    )
}

export default Trash
