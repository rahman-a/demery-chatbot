import React from 'react'

const PlusSquare = ({width, height, className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} viewBox="0 0 10.365 10.365">
            <path id="plus-square-solid" className="cls-1" d="M9.255,32H1.111A1.111,1.111,0,0,0,0,33.111v8.144a1.111,1.111,0,0,0,1.111,1.111H9.255a1.111,1.111,0,0,0,1.111-1.111V33.111A1.111,1.111,0,0,0,9.255,32Zm-.74,5.83a.278.278,0,0,1-.278.278H6.108v2.129a.278.278,0,0,1-.278.278h-1.3a.278.278,0,0,1-.278-.278V38.108H2.129a.278.278,0,0,1-.278-.278v-1.3a.278.278,0,0,1,.278-.278H4.257V34.129a.278.278,0,0,1,.278-.278h1.3a.278.278,0,0,1,.278.278v2.129H8.237a.278.278,0,0,1,.278.278Z" transform="translate(0 -32)"/>
        </svg>

    )
}

export default PlusSquare
