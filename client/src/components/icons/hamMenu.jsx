import React from 'react'

const HamMenu = ({width, height, className, eventHandler}) => {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg"  
        width={width} 
        height={height} 
        className={className} 
        onClick={eventHandler}
        viewBox="0 0 54.828 43.831">
  <defs>
    <filter id="Line_9" x="0" y="3.831" width="54.828" height="20" filterUnits="userSpaceOnUse">
      <feOffset dx="5" dy="10" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood floodOpacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Line_10" x="0" y="13.831" width="54.828" height="20" filterUnits="userSpaceOnUse">
      <feOffset dx="5" dy="10" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-2"/>
      <feFlood floodOpacity="0.161"/>
      <feComposite operator="in" in2="blur-2"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Line_11" x="0" y="23.831" width="54.828" height="20" filterUnits="userSpaceOnUse">
      <feOffset dx="5" dy="10" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-3"/>
      <feFlood floodOpacity="0.161"/>
      <feComposite operator="in" in2="blur-3"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_27" data-name="Group 27" transform="translate(-132 -99)">
    <rect id="Rectangle_19" data-name="Rectangle 19" width="43" height="28" transform="translate(133 99)" fill='transparent'/>
    <g id="Group_24" data-name="Group 24" transform="translate(113 78.831)">
      <g transform="matrix(1, 0, 0, 1, 19, 20.17)" filter="url(#Line_9)">
        <line id="Line_9-2" data-name="Line 9" x2="35.828" transform="translate(4.5 4.33)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, 19, 20.17)" filter="url(#Line_10)">
        <line id="Line_10-2" data-name="Line 10" x2="35.828" transform="translate(4.5 14.33)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, 19, 20.17)" filter="url(#Line_11)">
        <line id="Line_11-2" data-name="Line 11" x2="35.828" transform="translate(4.5 24.33)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1"/>
      </g>
    </g>
  </g>
</svg>

    )
}

export default HamMenu